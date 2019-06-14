// @flow

import type { ActionDeps } from '../redux'
import type { ErrorResponse, User } from '../types'
import getError, { shouldLogout } from '../helpers/getError'
import { logout } from '../user/actions'

type CreateUserAction =
  | { type: 'CREATE_USER_PENDING' }
  | { type: 'CREATE_USER_FULFILLED' }
  | { type: 'CREATE_USER_REJECTED', payload: ErrorResponse }

type DeleteUserAction =
  | { type: 'DELETE_USER_PENDING' }
  | { type: 'DELETE_USER_FULFILLED' }
  | { type: 'DELETE_USER_REJECTED', payload: ErrorResponse }

type UserListAction =
  | { type: 'USER_LIST_PENDING' }
  | { type: 'USER_LIST_FULFILLED', users: Array<User> }
  | { type: 'USER_LIST_REJECTED', payload: ErrorResponse }

export type UsersAction = UserListAction | CreateUserAction | DeleteUserAction

export const getUsers = () => async ({
  dispatch,
  apiClient,
}: (ActionDeps) => Promise<UserListAction>) => {
  try {
    dispatch(({ type: 'USER_LIST_PENDING' }: UserListAction))
    const { data: result } = await apiClient.getAuth('/users')

    return {
      type: 'USER_LIST_FULFILLED',
      users: result,
    }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return {
      type: 'USER_LIST_REJECTED',
      payload: getError(err),
    }
  }
}

export const createUser = (data: Object) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<CreateUserAction>) => {
  try {
    dispatch({ type: 'CREATE_USER_PENDING' })
    await apiClient.postAuth('/users', data)
    dispatch(await getUsers())

    return { type: 'CREATE_USER_FULFILLED' }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'CREATE_USER_REJECTED', payload: getError(err) }
  }
}

export const deleteUser = (id: string) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<DeleteUserAction>) => {
  try {
    dispatch({ type: 'DELETE_USER_PENDING' })
    await apiClient.deleteAuth(`/users/${id}`)
    dispatch(await getUsers())

    return { type: 'DELETE_USER_FULFILLED' }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'DELETE_USER_REJECTED', payload: getError(err) }
  }
}

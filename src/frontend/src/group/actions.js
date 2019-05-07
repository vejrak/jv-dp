// @flow

import type { ErrorResponse, Group } from '../types'
import type { ActionDeps } from '../redux'
import getError, { shouldLogout } from '../helpers/getError'
import { logout } from '../user/actions'

type GroupListAction =
  | { type: 'GROUP_LIST_PENDING' }
  | { type: 'GROUP_LIST_FULFILLED', groups: Array<Group> }
  | { type: 'GROUP_LIST_REJECTED', payload: ErrorResponse }

type GroupDeleteAction =
  | { type: 'DELETE_GROUP_PENDING' }
  | { type: 'DELETE_GROUP_FULFILLED' }
  | { type: 'DELETE_GROUP_REJECTED', payload: ErrorResponse }

type GroupCreateAction =
  | { type: 'GROUP_FORM_PENDING' }
  | { type: 'GROUP_FORM_FULFILLED' }
  | { type: 'GROUP_FORM_REJECTED', payload: ErrorResponse }

export type GroupAction =
  | GroupListAction
  | GroupCreateAction
  | GroupDeleteAction

export const getGroups = () => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<GroupListAction>) => {
  try {
    dispatch({ type: 'GROUP_LIST_PENDING' })
    const { data: result } = await apiClient.getAuth('/groups')

    return { type: 'GROUP_LIST_FULFILLED', groups: result }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'GROUP_LIST_REJECTED', payload: getError(err) }
  }
}

export const createGroup = (data: Object) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<GroupCreateAction>) => {
  try {
    dispatch(({ type: 'GROUP_FORM_PENDING' }: GroupCreateAction))
    await apiClient.postAuth('/groups', data)
    dispatch(await getGroups())

    return { type: 'GROUP_FORM_FULFILLED' }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'GROUP_FORM_REJECTED', payload: getError(err) }
  }
}

export const deleteGroup = (id: string) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<GroupDeleteAction>) => {
  try {
    dispatch({ type: 'DELETE_GROUP_PENDING' })
    await apiClient.deleteAuth(`/groups/${id}`)
    dispatch(await getGroups())

    return { type: 'DELETE_GROUP_FULFILLED' }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'DELETE_GROUP_REJECTED', payload: getError(err) }
  }
}

export const editGroup = (data: Object, id: string) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<GroupCreateAction>) => {
  try {
    dispatch(({ type: 'GROUP_FORM_PENDING' }: GroupCreateAction))
    await apiClient.patchAuth(`/groups/${id}`, data)
    dispatch(await getGroups())

    return { type: 'GROUP_FORM_FULFILLED' }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'GROUP_FORM_REJECTED', payload: getError(err) }
  }
}

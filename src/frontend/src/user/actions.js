// @flow

import Router from 'next/router'
import type { ActionDeps } from '../redux'
import type { ErrorResponse } from '../types'
import getError from '../helpers/getError'
import { setAuthToken, removeAuthToken } from '../helpers/authentication'

type LoginAction =
  | { type: 'LOGIN_PENDING' }
  | { type: 'LOGIN_FULFILLED', username: string, rank: number }
  | { type: 'LOGIN_REJECTED', payload: ErrorResponse }

type ChangePasswordAction =
  | { type: 'CHANGE_PASSWORD_PENDING' }
  | { type: 'CHANGE_PASSWORD_FULFILLED' }
  | { type: 'CHANGE_PASSWORD_REJECTED', payload: ErrorResponse }

type LogoutAction =
  | { type: 'LOGOUT_PENDING' }
  | { type: 'LOGOUT_FULFILLED' }
  | { type: 'LOGOUT_REJECTED' }

type AuthenticateAction = { type: 'AUTH_SUCCESS' } | { type: 'AUTH_ABORTED' }

type HydrateUserAction = {
  type: 'HYDRATE_USER',
  username: string,
  rank: number,
}

export type UserAction =
  | LoginAction
  | LogoutAction
  | HydrateUserAction
  | AuthenticateAction
  | ChangePasswordAction

export const authenticate = () => async ({
  apiClient,
}: (ActionDeps) => Promise<AuthenticateAction>) => {
  try {
    await apiClient.getAuth('/auth/check')
    return { type: 'AUTH_SUCCESS' }
  } catch (err) {
    removeAuthToken()
    await Router.push('/login')
    return {
      type: 'AUTH_ABORTED',
    }
  }
}

export const hydrateUser = (username: string, rank: number) => async ({
  dispatch,
}: (ActionDeps) => Promise<HydrateUserAction>) =>
  dispatch(
    ({
      type: 'HYDRATE_USER',
      username,
      rank,
    }: HydrateUserAction),
  )

export const changePassword = (data: Object) => async ({
  dispatch,
  apiClient,
}: (ActionDeps) => Promise<ChangePasswordAction>) => {
  try {
    dispatch(({ type: 'CHANGE_PASSWORD_PENDING' }: ChangePasswordAction))
    await apiClient.patchAuth('/auth/change-password', data)

    return {
      type: 'CHANGE_PASSWORD_FULFILLED',
    }
  } catch (err) {
    return {
      type: 'CHANGE_PASSWORD_REJECTED',
      payload: getError(err),
    }
  }
}

export const login = (data: Object) => async ({
  dispatch,
  apiClient,
}: (ActionDeps) => Promise<LoginAction>) => {
  try {
    dispatch(({ type: 'LOGIN_PENDING' }: LoginAction))
    const { data: result } = await apiClient.post('/auth/login', data)
    setAuthToken(result.token, result.username, result.rank)
    await Router.push('/')

    return {
      type: 'LOGIN_FULFILLED',
      username: result.username,
      rank: result.rank,
    }
  } catch (err) {
    return {
      type: 'LOGIN_REJECTED',
      payload: getError(err),
    }
  }
}

export const logout = () => async ({
  dispatch,
  apiClient,
}: (ActionDeps) => Promise<LogoutAction>) => {
  try {
    dispatch(({ type: 'LOGOUT_PENDING' }: LogoutAction))
    await apiClient.postAuth('/auth/logout')
    removeAuthToken()
    await Router.push('/')

    return { type: 'LOGOUT_FULFILLED' }
  } catch (err) {
    removeAuthToken()
    await Router.push('/')
    return {
      type: 'LOGOUT_REJECTED',
    }
  }
}

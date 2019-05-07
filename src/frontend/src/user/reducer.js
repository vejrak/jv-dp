// @flow

import type { ErrorResponse } from '../types'
import type { UserAction } from './actions'

export type UserState = {
  +username: '',
  +isLoggedIn: boolean,
  +isFetching: boolean,
  +rank: number,
  +error: ?ErrorResponse,
}

export type ChangePasswordState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
  +success: boolean,
}

export type UserStateType = {
  +user: UserState,
  +changePassword: ChangePasswordState,
}

const CHANGE_PASSWORD_STATE = {
  isFetching: false,
  error: null,
  success: false,
}

const USER_STATE = {
  username: '',
  isLoggedIn: false,
  isFetching: false,
  rank: 99,
  error: null,
}

const INITIAL_STATE = {
  user: USER_STATE,
  changePassword: CHANGE_PASSWORD_STATE,
}

const reducer = (state: UserStateType = INITIAL_STATE, action: UserAction) => {
  switch (action.type) {
    case 'LOGIN_PENDING':
      return {
        ...state,
        user: {
          ...state.user,
          isFetching: true,
          error: null,
        },
      }
    case 'LOGIN_REJECTED':
      return {
        ...state,
        user: {
          ...state.user,
          isFetching: false,
          error: action.payload,
        },
      }
    case 'LOGIN_FULFILLED':
      return {
        ...state,
        user: {
          ...state.user,
          isFetching: false,
          username: action.username,
          rank: action.rank,
          isLoggedIn: true,
        },
      }
    case 'CHANGE_PASSWORD_PENDING':
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          isFetching: true,
          sucess: false,
          error: null,
        },
      }
    case 'CHANGE_PASSWORD_FULFILLED':
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          isFetching: false,
          success: true,
        },
      }
    case 'CHANGE_PASSWORD_REJECTED':
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          isFetching: false,
          error: action.payload,
        },
      }
    case 'LOGOUT_PENDING':
      return {
        ...state,
        user: {
          ...state.user,
          isFetching: true,
        },
      }
    case 'LOGOUT_FULFILLED':
    case 'LOGOUT_REJECTED':
      return {
        ...state,
        user: {
          ...state.user,
          isFetching: false,
          isLoggedIn: false,
          error: null,
        },
      }
    case 'HYDRATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          isFetching: false,
          isLoggedIn: true,
          username: action.username,
          rank: action.rank,
          error: null,
        },
      }
    case 'AUTH_ABORTED':
      return {
        ...state,
        ...INITIAL_STATE,
      }
    case 'AUTH_SUCCESS':
    default:
      return state
  }
}

export default reducer

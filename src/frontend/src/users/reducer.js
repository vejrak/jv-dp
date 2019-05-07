// @flow

import type { ErrorResponse, User } from '../types'
import type { UsersAction } from './actions'

export type UsersListState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
  +users: Array<User>,
}

export type UserFormState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
}

export type DeleteUserState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
}

export type UsersState = {
  +usersList: UsersListState,
  +userForm: UserFormState,
  +userDelete: DeleteUserState,
}

const USERS_LIST_INITIAL_STATE = {
  isFetching: false,
  error: null,
  users: [],
}

const DELETE_USER_INITIAL_STATE = {
  isFetching: false,
  error: null,
}

const USER_FORM_INITIAL_STATE = {
  isFetching: false,
  error: null,
}

const INITIAL_STATE = {
  usersList: USERS_LIST_INITIAL_STATE,
  userForm: USER_FORM_INITIAL_STATE,
  userDelete: DELETE_USER_INITIAL_STATE,
}

const reducer = (state: UsersState = INITIAL_STATE, action: UsersAction) => {
  switch (action.type) {
    case 'DELETE_USER_PENDING':
      return {
        ...state,
        userDelete: { ...state.userDelete, isFetching: true, error: null },
      }
    case 'DELETE_USER_FULFILLED':
      return {
        ...state,
        userDelete: { ...state.userDelete, isFetching: false },
      }
    case 'DELETE_USER_REJECTED':
      return {
        ...state,
        userDelete: {
          ...state.userDelete,
          isFetching: false,
          error: action.payload,
        },
      }
    case 'CREATE_USER_PENDING':
      return {
        ...state,
        userForm: { ...state.userForm, isFetching: true, error: null },
      }
    case 'CREATE_USER_FULFILLED':
      return {
        ...state,
        userForm: {
          ...state.userForm,
          isFetching: false,
          error: null,
        },
      }
    case 'CREATE_USER_REJECTED':
      return {
        ...state,
        userForm: {
          ...state.userForm,
          isFetching: false,
          error: action.payload,
        },
      }
    case 'USER_LIST_PENDING':
      return {
        ...state,
        usersList: { ...state.usersList, isFetching: true, error: null },
      }
    case 'USER_LIST_FULFILLED':
      return {
        ...state,
        usersList: {
          ...state.usersList,
          isFetching: false,
          users: action.users,
        },
      }
    case 'USER_LIST_REJECTED':
      return {
        ...state,
        usersList: {
          ...state.usersList,
          isFetching: false,
          users: [],
          error: action.payload,
        },
      }
    default:
      return state
  }
}

export default reducer

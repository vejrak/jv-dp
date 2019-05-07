// @flow

import type { ErrorResponse, Group } from '../types'
import type { GroupAction } from './actions'

export type GroupListState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
  +groups: Array<Group>,
}

export type GroupFormState = {
  isFetching: boolean,
  error: ?ErrorResponse,
}

export type GroupDeleteState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
}

export type GroupState = {
  +groupList: GroupListState,
  +groupForm: GroupFormState,
  +groupDelete: GroupDeleteState,
}
const INITIAL_DELETE_GROUP_STATE = {
  isFetching: false,
  error: null,
}

const INITIAL_GROUP_FORM_STATE = {
  isFetching: false,
  error: null,
}
const INITIAL_GROUP_LIST_STATE = {
  isFetching: false,
  error: null,
  groups: [],
}

const INITIAL_GROUP_STATE = {
  groupList: INITIAL_GROUP_LIST_STATE,
  groupForm: INITIAL_GROUP_FORM_STATE,
  groupDelete: INITIAL_DELETE_GROUP_STATE,
}

const reducer = (
  state: GroupState = INITIAL_GROUP_STATE,
  action: GroupAction,
) => {
  switch (action.type) {
    case 'DELETE_GROUP_PENDING':
      return {
        ...state,
        groupDelete: { ...state.groupDelete, isFetching: true, error: null },
      }
    case 'DELETE_GROUP_FULFILLED':
      return {
        ...state,
        groupDelete: { ...state.groupDelete, isFetching: false },
      }
    case 'DELETE_GROUP_REJECTED':
      return {
        ...state,
        groupDelete: {
          ...state.groupDelete,
          isFetching: false,
          error: action.payload,
        },
      }
    case 'GROUP_LIST_PENDING':
      return {
        ...state,
        groupList: {
          ...state.groupList,
          isFetching: true,
          groups: [],
          error: null,
        },
      }
    case 'GROUP_LIST_FULFILLED':
      return {
        ...state,
        groupList: {
          ...state.groupList,
          isFetching: false,
          groups: action.groups,
        },
      }
    case 'GROUP_LIST_REJECTED':
      return {
        ...state,
        groupList: {
          ...state.groupList,
          isFetching: false,
          error: action.payload,
        },
      }
    case 'GROUP_FORM_PENDING':
      return {
        ...state,
        groupForm: { ...state.groupForm, isFetching: true, error: null },
      }
    case 'GROUP_FORM_FULFILLED':
      return {
        ...state,
        groupForm: { ...state.groupForm, isFetching: false },
      }
    case 'GROUP_FORM_REJECTED':
      return {
        ...state,
        groupForm: {
          ...state.groupForm,
          isFetching: false,
          error: action.payload,
        },
      }
    default:
      return state
  }
}

export default reducer

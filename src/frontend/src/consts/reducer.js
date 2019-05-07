// @flow

import type { ConstsAction } from './actions'
import type {
  ContentType,
  Datasource,
  Options,
  Roles,
  ErrorResponse,
  E,
} from '../types'

export type ConstsState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
  +roles: Roles | E,
  +datasource: Datasource | E,
  +contentType: ContentType | E,
  +options: Options | E,
}

const INITIAL_STATE = {
  isFetching: false,
  error: null,
  roles: {},
  datasource: {},
  contentType: {},
  options: {},
}

const reducer = (state: ConstsState = INITIAL_STATE, action: ConstsAction) => {
  switch (action.type) {
    case 'GET_CONSTS_PENDING':
      return {
        ...state,
        isFetching: true,
        error: null,
        roles: {},
        datasource: {},
        contentType: {},
        options: {},
      }
    case 'GET_CONSTS_REJECTED':
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      }
    case 'GET_CONSTS_FULFILLED':
      return {
        ...state,
        isFetching: false,
        datasource: action.datasource,
        contentType: action.contentType,
        options: action.options,
        roles: action.roles,
      }
    default:
      return state
  }
}

export default reducer

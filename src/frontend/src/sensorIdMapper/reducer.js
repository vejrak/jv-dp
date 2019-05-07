// @flow

import type { ErrorResponse, SensorIdMapper } from '../types'
import type { SensorIdMapperAction } from './actions'

export type SensorIdMapperListState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
  +sensorIdMappers: Array<SensorIdMapper>,
}

export type SensorIdMapperFormState = {
  isFetching: boolean,
  error: ?ErrorResponse,
}

export type SensorIdMapperDeleteState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
}

export type SensorIdMapperState = {
  +sensorIdMapperList: SensorIdMapperListState,
  +sensorIdMapperForm: SensorIdMapperFormState,
  +sensorIdMapperDelete: SensorIdMapperDeleteState,
}
const INITIAL_DELETE_SENSOR_ID_MAPPER_STATE = {
  isFetching: false,
  error: null,
}

const INITIAL_SENSOR_ID_MAPPER_FORM_STATE = {
  isFetching: false,
  error: null,
}
const INITIAL_SENSOR_ID_MAPPER_LIST_STATE = {
  isFetching: false,
  error: null,
  sensorIdMappers: [],
}

const INITIAL_SENSOR_ID_MAPPER_STATE = {
  sensorIdMapperList: INITIAL_SENSOR_ID_MAPPER_LIST_STATE,
  sensorIdMapperForm: INITIAL_SENSOR_ID_MAPPER_FORM_STATE,
  sensorIdMapperDelete: INITIAL_DELETE_SENSOR_ID_MAPPER_STATE,
}

const reducer = (
  state: SensorIdMapperState = INITIAL_SENSOR_ID_MAPPER_STATE,
  action: SensorIdMapperAction,
) => {
  switch (action.type) {
    case 'DELETE_SENSOR_ID_MAPPER_PENDING':
      return {
        ...state,
        sensorIdMapperDelete: {
          ...state.sensorIdMapperDelete,
          isFetching: true,
          error: null,
        },
      }
    case 'DELETE_SENSOR_ID_MAPPER_FULFILLED':
      return {
        ...state,
        sensorIdMapperDelete: {
          ...state.sensorIdMapperDelete,
          isFetching: false,
        },
      }
    case 'DELETE_SENSOR_ID_MAPPER_REJECTED':
      return {
        ...state,
        sensorIdMapperDelete: {
          ...state.sensorIdMapperDelete,
          isFetching: false,
          error: action.payload,
        },
      }
    case 'SENSOR_ID_MAPPER_LIST_PENDING':
      return {
        ...state,
        sensorIdMapperList: {
          ...state.sensorIdMapperList,
          isFetching: true,
          sensorIdMappers: [],
          error: null,
        },
      }
    case 'SENSOR_ID_MAPPER_LIST_FULFILLED':
      return {
        ...state,
        sensorIdMapperList: {
          ...state.sensorIdMapperList,
          isFetching: false,
          sensorIdMappers: action.sensorIdMappers,
        },
      }
    case 'SENSOR_ID_MAPPER_LIST_REJECTED':
      return {
        ...state,
        sensorIdMapperList: {
          ...state.sensorIdMapperList,
          isFetching: false,
          error: action.payload,
        },
      }
    case 'SENSOR_ID_MAPPER_FORM_PENDING':
      return {
        ...state,
        sensorIdMapperForm: {
          ...state.sensorIdMapperForm,
          isFetching: true,
          error: null,
        },
      }
    case 'SENSOR_ID_MAPPER_FORM_FULFILLED':
      return {
        ...state,
        sensorIdMapperForm: { ...state.sensorIdMapperForm, isFetching: false },
      }
    case 'SENSOR_ID_MAPPER_FORM_REJECTED':
      return {
        ...state,
        sensorIdMapperForm: {
          ...state.sensorIdMapperForm,
          isFetching: false,
          error: action.payload,
        },
      }
    default:
      return state
  }
}

export default reducer

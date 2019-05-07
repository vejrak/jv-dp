// @flow

import type { ErrorResponse, Sensor } from '../types'
import type { SensorAction } from './actions'

export type SensorListState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
  +sensors: Array<Sensor>,
}

export type SensorFormState = {
  isFetching: boolean,
  error: ?ErrorResponse,
}

export type SensorDeleteState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
}

export type SensorState = {
  +sensorList: SensorListState,
  +sensorForm: SensorFormState,
  +sensorDelete: SensorDeleteState,
}
const INITIAL_DELETE_SENSOR_STATE = {
  isFetching: false,
  error: null,
}

const INITIAL_SENSOR_FORM_STATE = {
  isFetching: false,
  error: null,
}
const INITIAL_SENSOR_LIST_STATE = {
  isFetching: false,
  error: null,
  sensors: [],
}

const INITIAL_SENSOR_STATE = {
  sensorList: INITIAL_SENSOR_LIST_STATE,
  sensorForm: INITIAL_SENSOR_FORM_STATE,
  sensorDelete: INITIAL_DELETE_SENSOR_STATE,
}

const reducer = (
  state: SensorState = INITIAL_SENSOR_STATE,
  action: SensorAction,
) => {
  switch (action.type) {
    case 'DELETE_SENSOR_PENDING':
      return {
        ...state,
        sensorDelete: { ...state.sensorDelete, isFetching: true, error: null },
      }
    case 'DELETE_SENSOR_FULFILLED':
      return {
        ...state,
        sensorDelete: { ...state.sensorDelete, isFetching: false },
      }
    case 'DELETE_SENSOR_REJECTED':
      return {
        ...state,
        sensorDelete: {
          ...state.sensorDelete,
          isFetching: false,
          error: action.payload,
        },
      }
    case 'SENSOR_LIST_PENDING':
      return {
        ...state,
        sensorList: {
          ...state.sensorList,
          isFetching: true,
          sensors: [],
          error: null,
        },
      }
    case 'SENSOR_LIST_FULFILLED':
      return {
        ...state,
        sensorList: {
          ...state.sensorList,
          isFetching: false,
          sensors: action.sensors,
        },
      }
    case 'SENSOR_LIST_REJECTED':
      return {
        ...state,
        sensorList: {
          ...state.sensorList,
          isFetching: false,
          error: action.payload,
        },
      }
    case 'SENSOR_FORM_PENDING':
      return {
        ...state,
        sensorForm: { ...state.sensorForm, isFetching: true, error: null },
      }
    case 'SENSOR_FORM_FULFILLED':
      return {
        ...state,
        sensorForm: { ...state.sensorForm, isFetching: false },
      }
    case 'SENSOR_FORM_REJECTED':
      return {
        ...state,
        sensorForm: {
          ...state.sensorForm,
          isFetching: false,
          error: action.payload,
        },
      }
    default:
      return state
  }
}

export default reducer

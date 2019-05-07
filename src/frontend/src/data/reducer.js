// @flow

import type { Data, ErrorResponse, Metric } from '../types'
import type { DataAction } from './actions'

export type DataListState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
  +dataCollection: Array<Data>,
}

export type SensorDataMetricsState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
  +metrics: Array<Metric>,
}

export type DataOverviewState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
  +overview: ?Object,
}

export type DataStatusState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
  +statusData: Array<Data>,
}

export type DataState = {
  +dataList: DataListState,
  +dataOverview: DataOverviewState,
  +statusData: DataStatusState,
  +sensorDataMetrics: SensorDataMetricsState,
}

const INITIAL_DATA_LIST_STATE = {
  isFetching: false,
  error: null,
  dataCollection: [],
}

const INITIAL_DATA_STATUS_STATE = {
  isFetching: false,
  error: null,
  statusData: [],
}

const INITIAL_DATA_OVERVIEW_STATE = {
  isFetching: false,
  error: null,
  overview: null,
}

const INITIAL_SENSOR_DATA_METRICS_STATE = {
  isFetching: false,
  error: null,
  metrics: [],
}

const INITIAL_DATA_STATE = {
  dataList: INITIAL_DATA_LIST_STATE,
  dataOverview: INITIAL_DATA_OVERVIEW_STATE,
  statusData: INITIAL_DATA_STATUS_STATE,
  sensorDataMetrics: INITIAL_SENSOR_DATA_METRICS_STATE,
}

const reducer = (state: DataState = INITIAL_DATA_STATE, action: DataAction) => {
  switch (action.type) {
    case 'SENSOR_DATA_METRICS_PENDING':
      return {
        ...state,
        sensorDataMetrics: {
          ...state.dataList,
          isFetching: true,
          error: null,
          metrics: [],
        },
      }
    case 'SENSOR_DATA_METRICS_FULFILLED':
      return {
        ...state,
        sensorDataMetrics: {
          ...state.dataList,
          isFetching: false,
          metrics: action.data,
        },
      }
    case 'SENSOR_DATA_METRICS_REJECTED':
      return {
        ...state,
        sensorDataMetrics: {
          ...state.dataList,
          isFetching: false,
          error: action.payload,
        },
      }
    case 'DATA_LIST_PENDING':
      return {
        ...state,
        dataList: {
          ...state.dataList,
          isFetching: true,
          error: null,
          dataCollection: [],
        },
      }
    case 'DATA_LIST_FULFILLED':
      return {
        ...state,
        dataList: {
          ...state.dataList,
          isFetching: false,
          dataCollection: action.data,
        },
      }
    case 'DATA_LIST_REJECTED':
      return {
        ...state,
        dataList: {
          ...state.dataList,
          isFetching: false,
          error: action.payload,
        },
      }
    case 'DATA_STATUS_PENDING':
      return {
        ...state,
        statusData: {
          ...state.statusData,
          isFetching: true,
          error: null,
          statusData: [],
        },
      }
    case 'DATA_STATUS_FULFILLED':
      return {
        ...state,
        statusData: {
          ...state.statusData,
          isFetching: false,
          statusData: action.data,
        },
      }
    case 'DATA_STATUS_REJECTED':
      return {
        ...state,
        statusData: {
          ...state.statusData,
          isFetching: false,
          error: action.payload,
        },
      }
    case 'DATA_OVERVIEW_PENDING':
      return {
        ...state,
        dataOverview: {
          ...state.dataOverview,
          isFetching: true,
          error: null,
          overview: null,
        },
      }
    case 'DATA_OVERVIEW_FULFILLED':
      return {
        ...state,
        dataOverview: {
          ...state.dataOverview,
          isFetching: false,
          overview: action.data,
        },
      }
    case 'DATA_OVERVIEW_REJECTED':
      return {
        ...state,
        dataOverview: {
          ...state.dataOverview,
          isFetching: false,
          error: action.payload,
        },
      }
    default:
      return state
  }
}

export default reducer

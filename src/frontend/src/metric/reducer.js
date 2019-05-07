// @flow

import type { ErrorResponse, Metric } from '../types'
import type { MetricAction } from './actions'

export type MetricListState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
  +metrics: Array<Metric>,
}

export type MetricDeleteState = {
  +isFetching: boolean,
  +error: ?ErrorResponse,
}

export type MetricFormState = {
  isFetching: boolean,
  error: ?ErrorResponse,
}
export type MetricState = {
  +metricList: MetricListState,
  +metricForm: MetricFormState,
  +metricDelete: MetricDeleteState,
}

const INITIAL_METRIC_FORM_STATE = {
  isFetching: false,
  error: null,
}

const INITIAL_DELETE_METRIC_STATE = {
  isFetching: false,
  error: null,
}

const INITIAL_METRIC_LIST_STATE = {
  isFetching: false,
  error: null,
  metrics: [],
}

const INITIAL_METRIC_STATE = {
  metricList: INITIAL_METRIC_LIST_STATE,
  metricForm: INITIAL_METRIC_FORM_STATE,
  metricDelete: INITIAL_DELETE_METRIC_STATE,
}

const reducer = (
  state: MetricState = INITIAL_METRIC_STATE,
  action: MetricAction,
) => {
  switch (action.type) {
    case 'DELETE_METRIC_PENDING':
      return {
        ...state,
        metricDelete: { ...state.metricDelete, isFetching: true, error: null },
      }
    case 'DELETE_METRIC_FULFILLED':
      return {
        ...state,
        metricDelete: { ...state.metricDelete, isFetching: false },
      }
    case 'DELETE_METRIC_REJECTED':
      return {
        ...state,
        metricDelete: {
          ...state.metricDelete,
          isFetching: false,
          error: action.payload,
        },
      }
    case 'METRIC_LIST_PENDING':
      return {
        ...state,
        metricList: {
          ...state.metricList,
          isFetching: true,
          metrics: [],
          error: null,
        },
      }
    case 'METRIC_LIST_FULFILLED':
      return {
        ...state,
        metricList: {
          ...state.metricList,
          isFetching: false,
          metrics: action.metrics,
        },
      }
    case 'METRIC_LIST_REJECTED':
      return {
        ...state,
        metricList: {
          ...state.metricList,
          isFetching: false,
          error: action.payload,
        },
      }
    case 'METRIC_FORM_PENDING':
      return {
        ...state,
        metricForm: { ...state.metricForm, isFetching: true, error: null },
      }
    case 'METRIC_FORM_FULFILLED':
      return {
        ...state,
        metricForm: { ...state.metricForm, isFetching: false },
      }
    case 'METRIC_FORM_REJECTED':
      return {
        ...state,
        metricForm: {
          ...state.metricForm,
          isFetching: false,
          error: action.payload,
        },
      }
    default:
      return state
  }
}

export default reducer

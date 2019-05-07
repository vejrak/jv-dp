// @flow

import type { ErrorResponse, Data } from '../types'
import type { ActionDeps } from '../redux'
import getError, { shouldLogout } from '../helpers/getError'
import { logout } from '../user/actions'

type DataListAction =
  | { type: 'DATA_LIST_PENDING' }
  | { type: 'DATA_LIST_FULFILLED', data: Array<Data> }
  | { type: 'DATA_LIST_REJECTED', payload: ErrorResponse }

type SensorDataMetricsAction =
  | { type: 'SENSOR_DATA_METRICS_PENDING' }
  | { type: 'SENSOR_DATA_METRICS_FULFILLED', data: Array<Data> }
  | { type: 'SENSOR_DATA_METRICS_REJECTED', payload: ErrorResponse }

type DataOverviewAction =
  | { type: 'DATA_OVERVIEW_PENDING' }
  | { type: 'DATA_OVERVIEW_FULFILLED', data: Object }
  | { type: 'DATA_OVERVIEW_REJECTED', payload: ErrorResponse }

type DataStatusAction =
  | { type: 'DATA_STATUS_PENDING' }
  | { type: 'DATA_STATUS_FULFILLED', data: Object }
  | { type: 'DATA_STATUS_REJECTED', payload: ErrorResponse }

export type DataAction =
  | DataOverviewAction
  | DataListAction
  | SensorDataMetricsAction
  | DataStatusAction

export const getData = (
  sensorId: string,
  metricId: ?string,
  unit: ?string,
  filterDataLast: ?string,
) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<DataListAction>) => {
  try {
    dispatch({ type: 'DATA_LIST_PENDING' })
    let url = `/data/${sensorId}`
    if (unit && metricId) url = url.concat(`/${metricId}?convertUnit=${unit}`)
    if (filterDataLast) url = url.concat(`&lastDate=${filterDataLast}`)
    const { data: result } = await apiClient.getAuth(url)

    return { type: 'DATA_LIST_FULFILLED', data: result }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'DATA_LIST_REJECTED', payload: getError(err) }
  }
}

export const getSensorDataMetrics = (sensorId: string) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<SensorDataMetricsAction>) => {
  try {
    dispatch({ type: 'SENSOR_DATA_METRICS_PENDING' })
    const { data: result } = await apiClient.getAuth(
      `/data/${sensorId}/metrics`,
    )

    return { type: 'SENSOR_DATA_METRICS_FULFILLED', data: result }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'SENSOR_DATA_METRICS_REJECTED', payload: getError(err) }
  }
}

export const getDataOverview = (metricId: string, sensorId: string) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<DataOverviewAction>) => {
  try {
    dispatch({ type: 'DATA_OVERVIEW_PENDING' })
    const { data: result } = await apiClient.getAuth(
      `/data/overview/${metricId}/${sensorId}`,
    )

    return { type: 'DATA_OVERVIEW_FULFILLED', data: result }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'DATA_OVERVIEW_REJECTED', payload: getError(err) }
  }
}

export const getStatusData = (sensorId: string) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<DataStatusAction>) => {
  try {
    dispatch({ type: 'DATA_STATUS_PENDING' })
    const { data: result } = await apiClient.getAuth(`/data/${sensorId}/status`)

    return { type: 'DATA_STATUS_FULFILLED', data: result }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'DATA_STATUS_REJECTED', payload: getError(err) }
  }
}

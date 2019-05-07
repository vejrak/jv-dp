// @flow

import type { ErrorResponse, Metric } from '../types'
import type { ActionDeps } from '../redux'
import getError, { shouldLogout } from '../helpers/getError'
import { logout } from '../user/actions'

type MetricListAction =
  | { type: 'METRIC_LIST_PENDING' }
  | { type: 'METRIC_LIST_FULFILLED', metrics: Array<Metric> }
  | { type: 'METRIC_LIST_REJECTED', payload: ErrorResponse }

type MetricDeleteAction =
  | { type: 'DELETE_METRIC_PENDING' }
  | { type: 'DELETE_METRIC_FULFILLED' }
  | { type: 'DELETE_METRIC_REJECTED', payload: ErrorResponse }

type MetricCreateAction =
  | { type: 'METRIC_FORM_PENDING' }
  | { type: 'METRIC_FORM_FULFILLED' }
  | { type: 'METRIC_FORM_REJECTED', payload: ErrorResponse }

export type MetricAction =
  | MetricListAction
  | MetricDeleteAction
  | MetricCreateAction

export const getMetrics = () => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<MetricListAction>) => {
  try {
    dispatch({ type: 'METRIC_LIST_PENDING' })
    const { data: result } = await apiClient.getAuth('/metrics')

    return { type: 'METRIC_LIST_FULFILLED', metrics: result }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'METRIC_LIST_REJECTED', payload: getError(err) }
  }
}

export const createMetric = (data: Object) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<MetricCreateAction>) => {
  try {
    dispatch(({ type: 'METRIC_FORM_PENDING' }: MetricCreateAction))
    await apiClient.postAuth('/metrics', data)
    dispatch(await getMetrics())

    return { type: 'METRIC_FORM_FULFILLED' }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'METRIC_FORM_REJECTED', payload: getError(err) }
  }
}

export const deleteMetric = (id: string) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<MetricDeleteAction>) => {
  try {
    dispatch({ type: 'DELETE_METRIC_PENDING' })
    await apiClient.deleteAuth(`/metrics/${id}`)
    dispatch(await getMetrics())

    return { type: 'DELETE_METRIC_FULFILLED' }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'DELETE_METRIC_REJECTED', payload: getError(err) }
  }
}

export const editMetric = (data: Object, id: string) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<MetricCreateAction>) => {
  try {
    dispatch(({ type: 'METRIC_FORM_PENDING' }: MetricCreateAction))
    await apiClient.patchAuth(`/metrics/${id}`, data)
    dispatch(await getMetrics())

    return { type: 'METRIC_FORM_FULFILLED' }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'METRIC_FORM_REJECTED', payload: getError(err) }
  }
}

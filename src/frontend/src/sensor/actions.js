// @flow

import type { ErrorResponse, Sensor } from '../types'
import type { ActionDeps } from '../redux'
import getError, { shouldLogout } from '../helpers/getError'
import { logout } from '../user/actions'

type SensorListAction =
  | { type: 'SENSOR_LIST_PENDING' }
  | { type: 'SENSOR_LIST_FULFILLED', sensors: Array<Sensor> }
  | { type: 'SENSOR_LIST_REJECTED', payload: ErrorResponse }

type SensorDeleteAction =
  | { type: 'DELETE_SENSOR_PENDING' }
  | { type: 'DELETE_SENSOR_FULFILLED' }
  | { type: 'DELETE_SENSOR_REJECTED', payload: ErrorResponse }

type SensorCreateAction =
  | { type: 'SENSOR_FORM_PENDING' }
  | { type: 'SENSOR_FORM_FULFILLED' }
  | { type: 'SENSOR_FORM_REJECTED', payload: ErrorResponse }

export type SensorAction =
  | SensorListAction
  | SensorCreateAction
  | SensorDeleteAction

export const getSensors = () => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<SensorListAction>) => {
  try {
    dispatch({ type: 'SENSOR_LIST_PENDING' })
    const { data: result } = await apiClient.getAuth('/sensors')

    return { type: 'SENSOR_LIST_FULFILLED', sensors: result }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'SENSOR_LIST_REJECTED', payload: getError(err) }
  }
}

export const createSensor = (data: Object) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<SensorCreateAction>) => {
  try {
    dispatch(({ type: 'SENSOR_FORM_PENDING' }: SensorCreateAction))
    await apiClient.postAuth('/sensors', data)
    dispatch(await getSensors())
    return { type: 'SENSOR_FORM_FULFILLED' }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'SENSOR_FORM_REJECTED', payload: getError(err) }
  }
}

export const deleteSensor = (id: string) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<SensorDeleteAction>) => {
  try {
    dispatch({ type: 'DELETE_SENSOR_PENDING' })
    await apiClient.deleteAuth(`/sensors/${id}`)
    dispatch(await getSensors())

    return { type: 'DELETE_SENSOR_FULFILLED' }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'DELETE_SENSOR_REJECTED', payload: getError(err) }
  }
}

export const editSensor = (data: Object, id: string) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<SensorCreateAction>) => {
  try {
    dispatch(({ type: 'SENSOR_FORM_PENDING' }: SensorCreateAction))
    await apiClient.patchAuth(`/sensors/${id}`, data)
    dispatch(await getSensors())

    return { type: 'SENSOR_FORM_FULFILLED' }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'SENSOR_FORM_REJECTED', payload: getError(err) }
  }
}

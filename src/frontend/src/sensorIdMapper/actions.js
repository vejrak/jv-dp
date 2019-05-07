// @flow

import type { ErrorResponse, SensorIdMapper } from '../types'
import type { ActionDeps } from '../redux'
import getError, { shouldLogout } from '../helpers/getError'
import { logout } from '../user/actions'

type SensorIdMapperListAction =
  | { type: 'SENSOR_ID_MAPPER_LIST_PENDING' }
  | {
      type: 'SENSOR_ID_MAPPER_LIST_FULFILLED',
      sensorIdMappers: Array<SensorIdMapper>,
    }
  | { type: 'SENSOR_ID_MAPPER_LIST_REJECTED', payload: ErrorResponse }

type SensorIdMapperDeleteAction =
  | { type: 'DELETE_SENSOR_ID_MAPPER_PENDING' }
  | { type: 'DELETE_SENSOR_ID_MAPPER_FULFILLED' }
  | { type: 'DELETE_SENSOR_ID_MAPPER_REJECTED', payload: ErrorResponse }

type SensorIdMapperCreateAction =
  | { type: 'SENSOR_ID_MAPPER_FORM_PENDING' }
  | { type: 'SENSOR_ID_MAPPER_FORM_FULFILLED' }
  | { type: 'SENSOR_ID_MAPPER_FORM_REJECTED', payload: ErrorResponse }

export type SensorIdMapperAction =
  | SensorIdMapperListAction
  | SensorIdMapperCreateAction
  | SensorIdMapperDeleteAction

export const getSensorIdMappers = () => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<SensorIdMapperListAction>) => {
  try {
    dispatch({ type: 'SENSOR_ID_MAPPER_LIST_PENDING' })
    const { data: result } = await apiClient.getAuth('/sensor_id_mappers')

    return { type: 'SENSOR_ID_MAPPER_LIST_FULFILLED', sensorIdMappers: result }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'SENSOR_ID_MAPPER_LIST_REJECTED', payload: getError(err) }
  }
}

export const createSensorIdMapper = (data: Object) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<SensorIdMapperCreateAction>) => {
  try {
    dispatch(
      ({ type: 'SENSOR_ID_MAPPER_FORM_PENDING' }: SensorIdMapperCreateAction),
    )
    await apiClient.postAuth('/sensor_id_mappers', data)
    dispatch(await getSensorIdMappers())
    return { type: 'SENSOR_ID_MAPPER_FORM_FULFILLED' }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'SENSOR_ID_MAPPER_FORM_REJECTED', payload: getError(err) }
  }
}

export const deleteSensorIdMapper = (id: string) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<SensorIdMapperDeleteAction>) => {
  try {
    dispatch({ type: 'DELETE_SENSOR_ID_MAPPER_PENDING' })
    await apiClient.deleteAuth(`/sensor_id_mappers/${id}`)
    dispatch(await getSensorIdMappers())
    return { type: 'DELETE_SENSOR_ID_MAPPER_FULFILLED' }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'DELETE_SENSOR_ID_MAPPER_REJECTED', payload: getError(err) }
  }
}

export const editSensorIdMapper = (data: Object, id: string) => async ({
  apiClient,
  dispatch,
}: (ActionDeps) => Promise<SensorIdMapperCreateAction>) => {
  try {
    dispatch(
      ({ type: 'SENSOR_ID_MAPPER_FORM_PENDING' }: SensorIdMapperCreateAction),
    )
    await apiClient.patchAuth(`/sensor_id_mappers/${id}`, data)
    dispatch(await getSensorIdMappers())
    return { type: 'SENSOR_ID_MAPPER_FORM_FULFILLED' }
  } catch (err) {
    if (shouldLogout(err)) dispatch(logout())
    return { type: 'SENSOR_ID_MAPPER_FORM_REJECTED', payload: getError(err) }
  }
}

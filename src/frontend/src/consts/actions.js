// @flow

import type { ActionDeps } from '../redux'
import type { Roles, Datasource, ContentType, Options } from '../types'

export type ConstsAction =
  | { type: 'GET_CONSTS_PENDING' }
  | {
      type: 'GET_CONSTS_FULFILLED',
      roles: Roles,
      datasource: Datasource,
      contentType: ContentType,
      options: Options,
    }
  | { type: 'GET_CONSTS_REJECTED', payload: Object }

export const getConsts = () => async ({
  dispatch,
  apiClient,
}: (ActionDeps) => Promise<ConstsAction>) => {
  try {
    dispatch(({ type: 'GET_CONSTS_PENDING' }: ConstsAction))
    const [
      { data: roles },
      { data: datasource },
      { data: contentType },
      { data: options },
    ] = await Promise.all([
      apiClient.get('/consts/roles'),
      apiClient.get('/consts/datasource'),
      apiClient.get('/consts/content-type'),
      apiClient.get('/consts/options'),
    ])
    return {
      type: 'GET_CONSTS_FULFILLED',
      roles,
      datasource,
      contentType,
      options,
    }
  } catch (err) {
    return {
      type: 'GET_CONSTS_REJECTED',
      payload: err,
    }
  }
}

// @flow

import get from 'lodash/get'
import type { ErrorResponse } from '../types'

export default (err: Object): ErrorResponse => {
  const { response } = err

  if (!response) return { errmsg: 'Bad Request or Internal error' }
  if (get(response, 'data.errmsg'))
    return { errmsg: get(response, 'data.errmsg') }
  return { errmsg: `${response.status} ${response.statusText}` }
}

export const shouldLogout = (err: Object): boolean => {
  const { response } = err
  if (!response) return false
  return response.status === 401
}

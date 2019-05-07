// @flow

import get from 'lodash/get'
import type { SensorIdMapper } from '../../models/types'

export default (
  sensorIdMappers: Array<SensorIdMapper>,
  body: Object,
): ?string => {
  for (let item of sensorIdMappers) {
    const value = get(body, item.source_name)
    if (value) return value
  }
  return null
}

// @flow

import get from 'lodash/get'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import compact from 'lodash/compact'
import type { BinaryMapper, Sensor } from '../../models/types'

export const parseBin = (
  binaryValue: string,
  binaryMappers: Array<BinaryMapper>,
  sensorId: string,
): Array<Object> =>
  compact(
    map(binaryMappers, (binaryMapper) => {
      const { from_byte, to_byte, unit, metric, is_status } = binaryMapper
      const value = parseInt(
        binaryValue.substring(from_byte - 1, to_byte),
        16,
      ).toString()
      if (!value) return
      if (is_status) return { sensor_id: sensorId, value, is_status }
      return {
        sensor_id: sensorId,
        value,
        metric,
        unit,
      }
    }),
  )

export default (body: string, sensor: Sensor): Array<Object> => {
  if (!sensor.binaryMappers) return []
  return parseBin(body, sensor.binaryMappers, sensor._id)
}

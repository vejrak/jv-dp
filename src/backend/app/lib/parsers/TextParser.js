// @flow

import compact from 'lodash/compact'
import map from 'lodash/map'
import type { BasicMapper, Sensor } from '../../models/types'

const getValue = (
  body: string,
  textMapper: BasicMapper,
  separator: string,
): ?string => {
  for (const item of body.split(separator)) {
    const value = item.replace(textMapper.source_name, '')

    if (value.length === item.length) continue
    return value
  }
  return null
}

export default (body: string, sensor: Sensor): Array<Object> => {
  const { separator } = sensor
  if (!separator) return []

  return compact(
    map(sensor.textMappers, (textMapper) => {
      const value = getValue(body, textMapper, separator)

      if (!value) return
      if (textMapper.is_status)
        return { sensor_id: sensor._id, value, is_status: textMapper.is_status }
      return {
        sensor_id: sensor._id,
        value,
        metric: textMapper.metric,
        unit: textMapper.unit,
      }
    }),
  )
}

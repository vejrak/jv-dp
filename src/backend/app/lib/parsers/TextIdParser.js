// @flow

import type { SensorIdMapper } from '../../models/types'

const getValue = (
  body: string,
  textMapper: SensorIdMapper,
  separator: string,
): ?string => {
  for (const item of body.split(separator)) {
    const { source_name } = textMapper
    if (!source_name) continue
    const value = item.replace(source_name, '')

    if (value.length === item.length) continue
    return value
  }
  return null
}

export default (
  sensorIdMapper: Array<SensorIdMapper>,
  body: string,
): ?string => {
  for (let textMapper of sensorIdMapper) {
    const { separator } = textMapper
    if (!separator) continue
    const value = getValue(body, textMapper, separator)
    if (value) return value
  }
}

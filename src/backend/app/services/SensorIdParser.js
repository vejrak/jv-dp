// @flow

import JsonIdParser from '../lib/parsers/JsonIdParser'
import Sensor from '../models/Sensor'
import SensorIdMapper from '../models/SensorIdMapper'
import type { Sensor as SensorType } from '../models/types'
import TextIdParser from '../lib/parsers/TextIdParser'
import BinaryIdParser from '../lib/parsers/BinaryIdParser'
import { getSensor } from './helpers'
import consts from '../consts'

export default async (
  headers: Object,
  requestBody: Object | string,
): Promise<?SensorType> => {
  try {
    if (
      headers['content-type'] === consts.contentType.TEXT &&
      typeof requestBody === 'string'
    ) {
      const sensorIdMapper = await SensorIdMapper.find({
        content_type: consts.contentType.TEXT,
      })
      if (!sensorIdMapper) return null
      return getSensor(TextIdParser(sensorIdMapper, requestBody))
    } else if (
      headers['content-type'] === consts.contentType.JSON &&
      typeof requestBody === 'object'
    ) {
      const sensorIdMapper = await SensorIdMapper.find({
        content_type: consts.contentType.JSON,
      })
      if (!sensorIdMapper) return null
      return getSensor(JsonIdParser(sensorIdMapper, requestBody))
    } else if (
      headers['content-type'] === consts.contentType.BINARY &&
      typeof requestBody === 'object'
    ) {
      const sensorIdMapper = await SensorIdMapper.find({
        content_type: consts.contentType.BINARY,
      })
      if (!sensorIdMapper) return null
      const values = BinaryIdParser(sensorIdMapper, requestBody.toString())
      for (const item of values) {
        const sensor = getSensor(item)
        if (sensor) return sensor
      }
      return null
    }
  } catch (err) {
    return null
  }
}

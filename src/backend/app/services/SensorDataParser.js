// @flow

import JsonBinParser from '../lib/parsers/JsonBinParser'
import JsonParser from '../lib/parsers/JsonParser'
import type { Sensor } from '../models/types'
import TextParser from '../lib/parsers/TextParser'
import BinaryParser from '../lib/parsers/BinaryParser'
import consts from '../consts'

export default (
  headers: Object,
  sensor: Sensor,
  requestBody: string | Object,
): Array<Object> => {
  if (
    headers['content-type'] === consts.contentType.TEXT &&
    sensor.datasource_type === consts.datasource.TEXT &&
    typeof requestBody === 'string'
  ) {
    return TextParser(requestBody, sensor)
  } else if (
    headers['content-type'] === consts.contentType.BINARY &&
    sensor.datasource_type === consts.datasource.BINARY &&
    typeof requestBody === 'object'
  ) {
    return BinaryParser(requestBody.toString(), sensor)
  } else if (
    headers['content-type'] === consts.contentType.JSON &&
    sensor.datasource_type === consts.datasource.JSON &&
    typeof requestBody === 'object'
  ) {
    return JsonParser(requestBody, sensor)
  } else if (
    headers['content-type'] === consts.contentType.JSON &&
    sensor.datasource_type === consts.datasource.JSON_BINARY &&
    typeof requestBody === 'object'
  ) {
    return JsonBinParser(requestBody, sensor)
  } else {
    return [{}]
  }
}

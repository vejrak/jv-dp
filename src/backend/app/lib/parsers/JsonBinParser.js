// @flow

import get from 'lodash/get'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import type { Sensor } from '../../models/types'
import { parseBin } from './BinaryParser'

export default (body: Object, sensor: Sensor): Array<Object> =>
  reduce(
    sensor.binaryMixedMappers,
    (result, item) => {
      if (!item || !item.binaryMappers || !item.source_name) return result
      const binaryValue = get(body, item.source_name)
      if (!binaryValue || !item.binaryMappers) return result
      const value = parseBin(binaryValue, item.binaryMappers, sensor._id)
      return [...result, ...value]
    },
    [],
  ) || []

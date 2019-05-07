// @flow

import get from 'lodash/get'
import map from 'lodash/map'
import compact from 'lodash/compact'
import type { Sensor } from '../../models/types'

export default (body: Object, sensor: Sensor): Array<Object> =>
  compact(
    map(sensor.jsonMappers, (jsonMapper) => {
      const value = get(body, jsonMapper.source_name)
      if (!value) return
      if (jsonMapper.is_status)
        return { sensor_id: sensor._id, value, is_status: jsonMapper.is_status }
      return {
        sensor_id: sensor._id,
        value,
        metric: jsonMapper.metric,
        unit: jsonMapper.unit,
      }
    }),
  )

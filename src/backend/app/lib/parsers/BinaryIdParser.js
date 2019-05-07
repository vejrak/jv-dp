// @flow

import compact from 'lodash/compact'
import type { SensorIdMapper } from '../../models/types'
import { parseBin } from './BinaryParser'

export default (
  sensorIdMappers: Array<SensorIdMapper>,
  body: string,
): Array<string> =>
  compact(
    sensorIdMappers.map((item) => {
      const { from_byte, to_byte } = item
      if (from_byte == null || to_byte == null) return
      const value = body.substring(from_byte - 1, to_byte)
      if (value) return value
      return
    }),
  )

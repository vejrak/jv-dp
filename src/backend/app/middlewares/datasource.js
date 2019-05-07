// @flow

import type { $Request, $Response, NextFunction } from 'express'
import SensorIdParser from '../services/SensorIdParser'

export default async (req: $Request, res: $Response, next: NextFunction) => {
  const { headers, body } = req
  const sensor = await SensorIdParser(headers, body)

  if (sensor) {
    req.sensor = sensor
    next()
  } else {
    return res.status(400).send()
  }
}

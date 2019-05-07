// @flow

import type { $Request, $Response, NextFunction } from 'express'
import Sensor from '../models/Sensor'
import haveUserPermissions from '../lib/groupPermissions'

export default (minimalRank: number) => async (
  req: $Request,
  res: $Response,
  next: NextFunction,
) => {
  const { sensorId } = req.params
  const { user } = req
  if (!sensorId) return res.status(400).send()
  try {
    const sensor = await Sensor.findById(sensorId)
      .lean()
      .exec()
    req.sensor = sensor
    if (!user || !haveUserPermissions(user, sensor, minimalRank)) {
      return res.status(403).send('Unauthorized')
    }
  } catch (err) {
    return res.status(400).send()
  }
  next()
}

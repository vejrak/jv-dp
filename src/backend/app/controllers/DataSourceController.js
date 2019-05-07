// @flow

import type { $Request, $Response } from 'express'
import Data from '../models/Data'
import SensorDataParser from '../services/SensorDataParser'

export const post = (req: $Request, res: $Response) => {
  const { headers, sensor, body } = req
  const data = SensorDataParser(headers, sensor, body)
  if (!data || !data.length) return res.status(400).json()
  Data.create(data, (err) => {
    if (err) return res.status(400).json(err)
    return res.status(200).json({ message: 'Success' })
  })
}

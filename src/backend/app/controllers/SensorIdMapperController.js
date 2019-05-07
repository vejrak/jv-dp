// @flow

import type { $Request, $Response } from 'express'
import SensorIdMapper from '../models/SensorIdMapper'

export const get = (req: $Request, res: $Response) => {
  SensorIdMapper.find(req.params)
    .lean()
    .exec((err, sensors) => {
      if (err) return res.status(404).json()
      res.json(sensors)
    })
}

export const post = (req: $Request, res: $Response) => {
  SensorIdMapper.create(req.body)
    .then((sensor) => {
      res.status(200).json(sensor.toJSON())
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

export const patch = (req: $Request, res: $Response) => {
  SensorIdMapper.findOneAndUpdate(req.params, { $set: req.body }, { new: true })
    .lean()
    .exec((err, sensor) => {
      if (err) return res.status(400).json(err)
      if (!sensor) return res.status(404).json([])
      res.status(200).json(sensor)
    })
}

export const remove = (req: $Request, res: $Response) => {
  SensorIdMapper.deleteOne(req.params)
    .then(() => {
      res.status(204).json({ success: true })
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

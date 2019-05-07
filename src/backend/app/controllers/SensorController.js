// @flow

import type { $Request, $Response } from 'express'
import Sensor from '../models/Sensor'
import Data from '../models/Data'

export const get = (req: $Request, res: $Response) => {
  Sensor.find({ ...req.params })
    .lean()
    .exec((err, sensors) => {
      if (err) return res.status(404).json()
      res.json(sensors)
    })
}

export const post = (req: $Request, res: $Response) => {
  Sensor.create(req.body)
    .then((sensor) => {
      res.status(200).json(sensor.toJSON())
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

export const patch = (req: $Request, res: $Response) => {
  Sensor.findOneAndUpdate(req.params, { $set: req.body }, { new: true })
    .lean()
    .exec((err, sensor) => {
      if (err) return res.status(400).json(err)
      if (!sensor) return res.status(404).json([])
      res.status(200).json(sensor)
    })
}

export const remove = (req: $Request, res: $Response) => {
  const { _id: sensorId } = req.params
  Sensor.deleteOne(req.params)
    .then(() => Data.deleteMany({ sensor_id: sensorId }))
    .then(() => {
      res.status(204).json({ success: true })
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

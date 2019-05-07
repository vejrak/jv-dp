// @flow

import type { $Request, $Response } from 'express'
import Metric from '../models/Metric'
import Data from '../models/Data'

export const get = (req: $Request, res: $Response) => {
  Metric.find(req.params)
    .lean()
    .exec((err, units) => {
      if (err) return res.status(404).send()
      res.json(units)
    })
}

export const post = (req: $Request, res: $Response) => {
  Metric.create(req.body)
    .then((unit) => {
      res.status(200).json(unit.toJSON())
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

export const patch = (req: $Request, res: $Response) => {
  Metric.findOneAndUpdate(req.params, { $set: req.body }, { new: true })
    .lean()
    .exec((err, metric) => {
      if (err) return res.status(400).json(err)
      if (!metric) return res.status(404).json([])
      res.status(200).json(metric)
    })
}

export const remove = (req: $Request, res: $Response) => {
  const { _id: metricId } = req.params
  Metric.deleteOne(req.params)
    .then(() => Data.deleteMany({ metric: metricId }))
    .then(() => {
      res.status(204).json({ success: true })
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

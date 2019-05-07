// @flow

import type { $Request, $Response } from 'express'
import Group from '../models/Group'

export const get = (req: $Request, res: $Response) => {
  Group.find(req.params)
    .lean()
    .exec((err, groups) => {
      if (err) res.status(404).json()
      res.json(groups)
    })
}

export const post = (req: $Request, res: $Response) => {
  Group.create(req.body)
    .then((group) => {
      res.status(200).json(group.toJSON())
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

export const patch = (req: $Request, res: $Response) => {
  Group.findOneAndUpdate(req.params, { $set: req.body }, { new: true })
    .lean()
    .exec((err, group) => {
      if (err) return res.status(400).json(err)
      if (!group) return res.status(404).json([])
      res.status(200).json(group)
    })
}

export const remove = (req: $Request, res: $Response) => {
  Group.deleteOne(req.params)
    .then(() => {
      res.status(204).json({ success: true })
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

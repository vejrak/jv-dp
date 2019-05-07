// @flow
import type { $Request, $Response } from 'express'
import isNil from 'lodash/isNil'
import omitBy from 'lodash/omitBy'
import User from '../models/User'
import { filterUsers } from './helpers'

export const get = (req: $Request, res: $Response) => {
  const query = omitBy(
    { _id: req.params.user_id, username: req.params.username },
    isNil,
  )

  User.find(query)
    .where('rank')
    .gt(req.user.rank)
    .lean()
    .exec((err, users) => {
      if (err) return res.status(404).json()
      res.json(filterUsers(users))
    })
}

export const post = (req: $Request, res: $Response) => {
  const query = { ...req.body }
  if (req.user.rank >= query.rank) return res.status(403).json()
  User.create(query)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

export const remove = (req: $Request, res: $Response) => {
  if (req.user.rank >= req.params.id) return res.status(403).json()
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.status(400).json(err)
    return res.status(204).json()
  })
}

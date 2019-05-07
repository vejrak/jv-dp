// @flow

import type { $Request, $Response, NextFunction } from 'express'
import consts from '../consts'

const { ADMIN } = consts.roles

export default (requiredRank: number, useGroups: boolean = false) => (
  req: $Request,
  res: $Response,
  next: NextFunction,
) => {
  if (!req.user || req.user.rank > requiredRank) {
    res.status(401).send('Unauthorized')
  } else {
    if (useGroups && req.user.rank > ADMIN)
      req.params.groups = { $in: req.user.groups }
    next()
  }
}

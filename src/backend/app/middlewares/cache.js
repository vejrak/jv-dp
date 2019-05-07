// @flow

import type { $Request, $Response, NextFunction } from 'express'

export default (cacheParams: string) => (
  req: $Request,
  res: $Response,
  next: NextFunction,
) => {
  res.header({
    'Cache-Control': cacheParams,
  })

  next()
}

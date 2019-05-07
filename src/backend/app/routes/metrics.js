// @flow

import type { $Application } from 'express'
import passport from 'passport'
import * as MetricController from '../controllers/MetricController'
import appPassport from '../middlewares/passport'
import authorization from '../middlewares/authorization'
import cache from '../middlewares/cache'
import consts from '../consts'

const { ADMIN, USER } = consts.roles

appPassport(passport)

export default (app: $Application) => {
  app.get(
    '/metrics/name/:name',
    passport.authenticate('jwt', { session: false }),
    authorization(USER),
    cache('no-cache'),
    MetricController.get,
  )
  app.get(
    '/metrics/:_id',
    passport.authenticate('jwt', { session: false }),
    authorization(USER),
    cache('no-cache'),
    MetricController.get,
  )
  app.get(
    '/metrics',
    passport.authenticate('jwt', { session: false }),
    authorization(USER),
    cache('no-cache'),
    MetricController.get,
  )
  app.patch(
    '/metrics/:_id',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    MetricController.patch,
  )
  app.post(
    '/metrics',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    MetricController.post,
  )
  app.delete(
    '/metrics/:_id',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    MetricController.remove,
  )
}

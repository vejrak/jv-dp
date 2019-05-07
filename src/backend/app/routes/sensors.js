// @flow

import type { $Application } from 'express'
import passport from 'passport'
import * as SensorController from '../controllers/SensorController'
import appPassport from '../middlewares/passport'
import authorization from '../middlewares/authorization'
import cache from '../middlewares/cache'
import consts from '../consts'

const { ADMIN, USER } = consts.roles

appPassport(passport)

export default (app: $Application) => {
  app.get(
    '/sensors/:_id',
    passport.authenticate('jwt', { session: false }),
    authorization(USER, true),
    cache('no-cache'),
    SensorController.get,
  )
  app.get(
    '/sensors',
    passport.authenticate('jwt', { session: false }),
    authorization(USER, true),
    cache('no-cache'),
    SensorController.get,
  )
  app.patch(
    '/sensors/:_id',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    SensorController.patch,
  )
  app.post(
    '/sensors',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    SensorController.post,
  )
  app.delete(
    '/sensors/:_id',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    SensorController.remove,
  )
}

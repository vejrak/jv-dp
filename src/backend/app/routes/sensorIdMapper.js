// @flow

import type { $Application } from 'express'
import passport from 'passport'
import * as SensorIdMapperController from '../controllers/SensorIdMapperController'
import appPassport from '../middlewares/passport'
import authorization from '../middlewares/authorization'
import cache from '../middlewares/cache'
import consts from '../consts'

const { ADMIN } = consts.roles

appPassport(passport)

export default (app: $Application) => {
  app.get(
    '/sensor_id_mappers/:_id',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    cache('no-cache'),
    SensorIdMapperController.get,
  )
  app.get(
    '/sensor_id_mappers',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    cache('no-cache'),
    SensorIdMapperController.get,
  )
  app.patch(
    '/sensor_id_mappers/:_id',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    SensorIdMapperController.patch,
  )
  app.post(
    '/sensor_id_mappers',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    SensorIdMapperController.post,
  )
  app.delete(
    '/sensor_id_mappers/:_id',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    SensorIdMapperController.remove,
  )
}

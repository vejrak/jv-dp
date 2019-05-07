// @flow

import type { $Application } from 'express'
import passport from 'passport'
import * as DataController from '../controllers/DataController'
import appPassport from '../middlewares/passport'
import consts from '../consts'
import cache from '../middlewares/cache'
import dataAuthorization from '../middlewares/dataAuthorization'

const { ADMIN, USER } = consts.roles

appPassport(passport)

export default (app: $Application) => {
  app.get(
    '/data/:sensorId/metrics',
    passport.authenticate('jwt', { session: false }),
    cache('no-cache'),
    dataAuthorization(USER),
    DataController.getSensorDataMetrics,
  )
  app.get(
    '/data/:sensorId?/status',
    passport.authenticate('jwt', { session: false }),
    cache('no-cache'),
    dataAuthorization(USER),
    DataController.getStatusData,
  )
  app.get(
    '/data/:sensorId/:metricId?',
    passport.authenticate('jwt', { session: false }),
    cache('no-cache'),
    dataAuthorization(USER),
    DataController.getData,
  )
  app.get(
    '/data/overview/:metricId/:sensorId',
    passport.authenticate('jwt', { session: false }),
    cache('no-cache'),
    dataAuthorization(USER),
    DataController.getDataOverview,
  )
}

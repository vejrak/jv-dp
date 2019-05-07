// @flow

import type { $Application } from 'express'
import passport from 'passport'
import * as GroupController from '../controllers/GroupController'
import appPassport from '../middlewares/passport'
import authorization from '../middlewares/authorization'
import cache from '../middlewares/cache'
import consts from '../consts'

const { ADMIN } = consts.roles

appPassport(passport)

export default (app: $Application) => {
  app.get(
    '/groups/:_id',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    cache('no-cache'),
    GroupController.get,
  )
  app.get(
    '/groups',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    cache('no-cache'),
    GroupController.get,
  )
  app.patch(
    '/groups/:_id',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    GroupController.patch,
  )
  app.post(
    '/groups',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    GroupController.post,
  )
  app.delete(
    '/groups/:_id',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    GroupController.remove,
  )
}

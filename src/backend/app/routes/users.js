// @flow

import type { $Application } from 'express'
import passport from 'passport'
import * as UserController from '../controllers/UserController'
import appPassport from '../middlewares/passport'
import authorization from '../middlewares/authorization'
import cache from '../middlewares/cache'
import consts from '../consts'

const { ADMIN } = consts.roles

appPassport(passport)

export default (app: $Application) => {
  app.get(
    '/users/username/:username',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    cache('no-cache'),
    UserController.get,
  )
  app.get(
    '/users/:userId',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    cache('no-cache'),
    UserController.get,
  )
  app.post(
    '/users',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    UserController.post,
  )
  app.get(
    '/users',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    UserController.get,
  )
  app.delete(
    '/users/:id',
    passport.authenticate('jwt', { session: false }),
    authorization(ADMIN),
    UserController.remove,
  )
}

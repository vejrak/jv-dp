// @flow

import type { $Application } from 'express'
import passport from 'passport'
import * as AuthController from '../controllers/AuthController'
import appPassport from '../middlewares/passport'

appPassport(passport)

export default (app: $Application) => {
  app.post('/auth/login', AuthController.login)
  app.post(
    '/auth/logout',
    passport.authenticate('jwt', { session: false }),
    AuthController.logout,
  )
  app.get(
    '/auth/check',
    passport.authenticate('jwt', { session: false }),
    AuthController.check,
  )
  app.patch(
    '/auth/change-password',
    passport.authenticate('jwt', { session: false }),
    AuthController.changePassword,
  )
  app.get('/create-init', AuthController.createInit)
}

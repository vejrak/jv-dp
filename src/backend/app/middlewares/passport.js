// @flow

import { ExtractJwt, Strategy } from 'passport-jwt'
import type { Passport } from 'passport'
import User from '../models/User'
import config from '../config/config'

export default (passport: Passport) => {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = config.jwt_secret

  passport.use(
    new Strategy(opts, async function(jwt_payload, done) {
      User.findById(jwt_payload.user_id)
        .lean()
        .exec((err, user) => {
          if (err) throw err

          if (user) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
    }),
  )
}

// @flow
import mongoose, { Schema } from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import jwt from 'jsonwebtoken'
import timestamps from 'mongoose-timestamp'
import config from '../config/config'

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      bcrypt: true,
    },
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Group',
      },
    ],
    rank: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
    },
  },
  { collection: 'users', versionKey: false },
)

UserSchema.methods.getJwt = function() {
  const expiration_time = parseInt(config.jwt_expiration)
  return (
    'Bearer ' +
    jwt.sign({ user_id: this._id }, config.jwt_secret, {
      expiresIn: expiration_time,
    })
  )
}

UserSchema.plugin(bcrypt)
UserSchema.plugin(timestamps)

export default mongoose.model('User', UserSchema)

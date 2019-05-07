// @flow

import mongoose, { Schema } from 'mongoose'

const GroupSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { collection: 'groups', versionKey: false },
)

export default mongoose.model('Group', GroupSchema)

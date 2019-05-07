// @flow

import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'

const DataSchema = new Schema(
  {
    sensor_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    metric: {
      type: String,
      trim: true,
    },
    unit: {
      type: String,
      trim: true,
    },
    is_status: {
      type: Boolean,
    },
  },
  { collection: 'data', versionKey: false },
)

DataSchema.pre('save', function(next) {
  if (this.isNew && !this.is_status) {
    this.is_status = false
  }

  next()
})

DataSchema.plugin(timestamps)

export default mongoose.model('Data', DataSchema)

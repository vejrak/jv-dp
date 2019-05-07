// @flow

import mongoose, { Schema } from 'mongoose'

const SensorIdMapperSchema = new Schema(
  {
    source_name: {
      type: String,
      trim: true,
    },
    content_type: {
      type: String,
      trim: true,
      required: true,
    },
    separator: {
      type: String,
    },
    from_byte: {
      type: Number,
      trim: true,
    },
    to_byte: {
      type: Number,
      trim: true,
    },
  },
  { collection: 'sensor_id_mappers', versionKey: false },
)

export default mongoose.model('SensorIdMapper', SensorIdMapperSchema)

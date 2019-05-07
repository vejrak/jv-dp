// @flow

import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'

const binaryMapper = new Schema({
  from_byte: {
    type: Number,
    trim: true,
    required: true,
  },
  to_byte: {
    type: Number,
    trim: true,
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
})

const binaryMixedMapper = new Schema({
  source_name: {
    type: String,
    trim: true,
    required: true,
  },
  binaryMappers: [binaryMapper],
})

const basicMapper = new Schema({
  source_name: {
    type: String,
    trim: true,
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
})

const SensorSchema = new Schema(
  {
    identificator: {
      type: String,
      unique: true,
      trim: true,
      index: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    datasource_type: {
      type: String,
      required: true,
      trim: true,
    },
    separator: {
      type: String,
    },
    lat: { type: Number },
    lng: {
      type: Number,
    },
    jsonMappers: [basicMapper],
    textMappers: [basicMapper],
    binaryMappers: [binaryMapper],
    binaryMixedMappers: [binaryMixedMapper],
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Group',
      },
    ],
  },
  { collection: 'sensors', versionKey: false },
)

SensorSchema.pre('save', function(next) {
  if (this.isNew && (!this.jsonMappers || this.jsonMappers.length === 0)) {
    this.jsonMappers = undefined
  }

  if (this.isNew && (!this.textMappers || this.textMappers.length === 0)) {
    this.textMappers = undefined
  }
  next()
})

SensorSchema.plugin(timestamps)

export default mongoose.model('Sensor', SensorSchema)

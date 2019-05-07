// @flow

import mongoose, { Schema } from 'mongoose'
import find from 'lodash/find'

const UnitSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  anchor: {
    type: Boolean,
  },
  to_anchor: {
    type: Number,
  },
})

const MetricSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      required: true,
    },
    units: [UnitSchema],
  },
  { collection: 'metrics', versionKey: false },
)

MetricSchema.pre('save', function(next) {
  if (this.isNew && this.units) {
    const unit = find(this.units, { anchor: true })
    if (unit && unit.anchor && !unit.to_anchor) unit.to_anchor = 1
  }
  next()
})

export default mongoose.model('Metric', MetricSchema)

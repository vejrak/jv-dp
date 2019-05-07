// @flow

import type { $Request, $Response } from 'express'
import identity from 'lodash/identity'
import pickBy from 'lodash/pickBy'
import mongoose from 'mongoose'
import Data from '../models/Data'
import Metric from '../models/Metric'
import convertData, { convertOutput } from '../services/DataConvertor'
import getOverviewData from '../services/DataOverviewBuilder'

export const getData = (req: $Request, res: $Response) => {
  const { sensorId: sensor_id, metricId: metric } = req.params
  const findParam = pickBy({ sensor_id, metric }, identity)
  Data.find({ ...findParam, is_status: false })
    .lean()
    .exec(async (err, data) => {
      if (err) return res.status(404).json()
      try {
        const convertedData = await convertData(req.query, req.params, data)
        if (!convertedData) return res.status(400).json()
        return res.json(convertedData)
      } catch (err) {
        return res.status(400).json(err)
      }
    })
}

export const getStatusData = (req: $Request, res: $Response) => {
  const { sensorId: sensor_id } = req.params
  const findParam = pickBy({ sensor_id }, identity)
  Data.find({ ...findParam, is_status: true })
    .lean()
    .exec(async (err, data) => {
      if (err) return res.status(404).json()
      return res.json(convertOutput(data))
    })
}

export const getSensorDataMetrics = (req: $Request, res: $Response) => {
  const { sensorId: sensor_id } = req.params
  const findParam = pickBy({ sensor_id }, identity)
  Data.find({ ...findParam, is_status: false })
    .distinct('metric')
    .lean()
    .exec(async (err, dataMetrics) => {
      const metricsIds = dataMetrics
        .filter((item) => item.length === 24)
        .map((item) => new mongoose.Types.ObjectId(item))
      const metrics = await Metric.find({ _id: { $in: metricsIds } })
      if (err || !metrics) return res.status(400).json()
      return res.json(metrics)
    })
}

export const getDataOverview = (req: $Request, res: $Response) => {
  const { metricId, sensorId } = req.params
  if (!metricId || !sensorId) return res.status(400).json()
  Data.find({ metric: metricId, sensor_id: sensorId, is_status: false })
    .lean()
    .exec(async (err, data) => {
      if (err) return res.status(404).json(err)
      try {
        if (!data.length) return res.json(data)
        const overviewData = await getOverviewData(data, req.user, sensorId)
        if (!overviewData) return res.status(400).json()
        res.json(overviewData)
      } catch (err) {
        return res.status(400).json(err)
      }
    })
}

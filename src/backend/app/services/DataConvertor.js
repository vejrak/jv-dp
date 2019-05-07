// @flow

import moment from 'moment'
import compact from 'lodash/compact'
import filter from 'lodash/filter'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'
import type { Data } from '../models/types'
import Metric from '../models/Metric'
import convertUnit from '../lib/unitConverter'
import consts from '../consts'

export const convertValuesUnit = async (
  data: Array<Data>,
  metricId: string,
  unit: string,
) => {
  if (!unit || !metricId) return data
  const metric = await Metric.findById(metricId)
  if (!metric) return data
  try {
    return compact(
      data.map((item: Data) => {
        if (metric._id.toString() !== item.metric) return
        const convertedValue = convertUnit(item.unit, unit, metric, item.value)
        if (!convertedValue) return
        return {
          ...item,
          value: convertedValue,
          unit: unit,
        }
      }),
    )
  } catch (err) {
    return compact(data)
  }
}

export const convertOutput = (data: Array<Data>): Array<Object> =>
  data.map((item) => {
    return pickBy(
      {
        value: item.value,
        metric: item.metric,
        unit: item.unit,
        createdAt: moment(item.createdAt).format(
          consts.options.DATE_TIME_FORMAT,
        ),
      },
      identity,
    )
  })

export const filterDataByLastDateUnit = (data: Array<Data>, query: Object) => {
  const { lastDate } = query
  if (!lastDate || lastDate === 'all') return data
  const actualDate = moment()
  return filter(
    data,
    (item) => actualDate.diff(moment(item.createdAt), lastDate) < 1,
  )
}
export default async (query: Object, params: Object, data: Array<Data>) =>
  convertOutput(
    await convertValuesUnit(
      filterDataByLastDateUnit(data, query),
      params.metricId,
      query.convertUnit,
    ),
  )

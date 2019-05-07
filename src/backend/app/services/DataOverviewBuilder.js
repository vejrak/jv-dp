// @flow

import find from 'lodash/find'
import groupBy from 'lodash/groupBy'
import maxBy from 'lodash/maxBy'
import meanBy from 'lodash/meanBy'
import minBy from 'lodash/minBy'
import transform from 'lodash/transform'
import haveUserDataPermissions from '../lib/groupPermissions'
import consts from '../consts'
import Sensor from '../models/Sensor'
import { convertValuesUnit } from './DataConvertor'
import type { Data, SensorType, Unit, User } from '../consts'

const { ADMIN } = consts.roles
type PreOverview = {
  min: number,
  max: number,
  sum: number,
  numberOfValidItems: number,
}

type Overview = {
  min: ?number,
  max: ?number,
  mean: ?number,
  unit: string,
}

type GroupedData = { [string]: Array<Data> }

const getOverviewData = (data: Array<Data>): PreOverview =>
  data.reduce(
    (output, item) => {
      if (isNaN(item.value)) {
        output.numberOfValidItems = output.numberOfValidItems - 1
        return output
      }
      const value = parseFloat(item.value)
      const { min, max, sum } = output
      if (min > value) output.min = value
      if (max < value) output.max = value
      output.sum = sum + value
      return output
    },
    { min: Infinity, max: -Infinity, sum: 0, numberOfValidItems: data.length },
  )

const getMean = (sum: number, numberOfValidItems: number): ?number => {
  return sum && numberOfValidItems
    ? parseFloat((sum / numberOfValidItems).toFixed(4))
    : null
}

const getOverview = async (data: Array<Data>): Promise<?Overview> => {
  const unit = data[0].unit
  const metricId = data[0].metric
  if (!metricId || !unit) throw Error('Data cant be converted to same unit')
  const convertedData = await convertValuesUnit(data, metricId, unit)
  if (!convertedData) throw Error('Data cant be converted to same unit')
  const { min, max, sum, numberOfValidItems } = getOverviewData(convertedData)
  return {
    min,
    max,
    mean: getMean(sum, numberOfValidItems),
    unit,
  }
}

export default async (
  data: Array<Data>,
  user: User,
  sensorId: string,
): Promise<?Overview> => {
  const sensor = await Sensor.findById(sensorId)
  if (data.length && haveUserDataPermissions(user, sensor, ADMIN))
    return await getOverview(data)
  else throw Error('You have no premissions to see data or sensor have no data')
}

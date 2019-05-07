// @flow

import find from 'lodash/find'
import some from 'lodash/some'
import type { Metric, Unit } from '../../models/types'

const hasAnchor = (metric: Metric): boolean =>
  some(metric.units, ['anchor', true])
const convertUnitToAnchor = (unit: Unit, value: number): number =>
  value * unit.to_anchor
const convertAnchorToUnit = (unit: Unit, value: number): number =>
  value / unit.to_anchor

const getUnitOfMetric = (unitName: string, metric: Metric): ?Unit => {
  if (!metric.units) return null
  return find(metric.units, { name: unitName })
}

export default (
  fromUnitName: string,
  toUnitName: string,
  metric: Metric,
  value: string,
): ?string => {
  if (isNaN(value)) return value
  const fromUnit = getUnitOfMetric(fromUnitName, metric)
  const toUnit = getUnitOfMetric(toUnitName, metric)
  if (!fromUnit || !toUnit) return null
  if (!fromUnit.to_anchor || !toUnit.to_anchor) return null
  if (fromUnit.name === toUnit.name) return value
  if (!hasAnchor(metric)) return null

  return convertAnchorToUnit(
    toUnit,
    convertUnitToAnchor(fromUnit, parseFloat(value)),
  ).toString()
}

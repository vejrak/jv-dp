// @flow

import includes from 'lodash/includes'
import find from 'lodash/find'
import type { ValidationResult } from './validation'
import type { Group, Metric } from '../types'

export const canShowUpdateForm = (
  idsList: Array<string>,
  id: string,
): boolean => includes(idsList, id)

export const isFieldInvalid = (validation: ?ValidationResult) =>
  !!validation && validation.type !== 'valid'

export const isFormValid = (validationResults: Object): boolean =>
  !Object.values(validationResults).some((res: any) => isFieldInvalid(res))

export const getGroupForSelect = (
  groups: Array<Group>,
  inputGroups: Array<string>,
) =>
  groups.reduce((acc, val) => {
    if (inputGroups.includes(val._id))
      acc.push({ value: val._id, label: val.name })
    return acc
  }, [])

export const createGroupsOptions = (groups?: Array<Group>): Array<Object> => {
  if (!groups) return []
  return groups.map((group: Group) => ({
    value: group._id,
    label: group.name,
  }))
}

export const getMetricById = (
  metricId: string,
  metrics: Array<Metric>,
): ?Metric => find(metrics, (metric) => metric._id === metricId)

export const getFirstUnitOfMetric = (metric: ?Metric): string =>
  metric && metric.units.length ? metric.units[0].name : ''

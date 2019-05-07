// @flow

import clone from 'lodash/clone'
import some from 'lodash/some'
import type { Unit } from '../../types'

export const addNewUnit = (units: Array<Unit>): Array<Unit> =>
  units.concat({ name: '', anchor: false, to_anchor: 0.1 })

export const immutableEditUnit = (
  units: Array<Unit>,
  unit: Unit,
  index: number,
): Array<Unit> => {
  const newUnits = clone(units)
  newUnits[index] = unit
  return newUnits
}

export const canBeAnchor = (units: Array<Unit>, unit: Unit): boolean =>
  !some(units, { anchor: true }) || unit.anchor

// @flow

import type { Unit } from '../types'

type MinLength = {
  type: 'minLength',
  minLength: number,
}
type Required = { type: 'required' }
type InvalidInteger = { type: 'invalidInteger' }
type Valid = { type: 'valid' }
type UnitsInvalid = { type: 'unitsInvalid' }

export type ValidationResult =
  | MinLength
  | Required
  | Valid
  | UnitsInvalid
  | InvalidInteger

export type ValidationResults<T> = {
  [key: $Keys<T>]: ?ValidationResult,
}

export type Validator<T> = (
  value?: T,
  optional?: boolean,
  match?: string,
) => ?ValidationResult

export const required: Validator<string> = (value = '', optional) => {
  if (value.length === 0) return optional ? null : { type: 'required' }
  return { type: 'valid' }
}

export const isValidInteger = (value: number) => {
  if (!Number.isInteger(value)) return { type: 'invalidInteger' }
  return { type: 'valid' }
}

export const areUnitsValid = (units: Array<Unit>) => {
  if (units.length !== 0) {
    // eslint-disable-next-line
    for (const unit of units) {
      if (!unit.name) return { type: 'unitsInvalid' }
      // eslint-disable-next-line
      if (isNaN(unit.to_anchor)) return { type: 'unitsInvalid' }
    }
  }
  return { type: 'valid' }
}

export const shortString: Validator<string> = (value = '', optional) => {
  if (value.length === 0) return optional ? null : { type: 'required' }
  if (value.length < 3) return { type: 'minLength', minLength: 3 }
  return { type: 'valid' }
}

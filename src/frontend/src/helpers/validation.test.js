import {
  required,
  isValidInteger,
  areUnitsValid,
  shortString,
} from './validation'

describe('validation tests', () => {
  test('Required validation test', () => {
    expect(required('')).toEqual({ type: 'required' })
    expect(required('value')).toEqual({ type: 'valid' })
  })
  test('Short string validation test', () => {
    expect(shortString('')).toEqual({ type: 'required' })
    expect(shortString('va')).toEqual({ type: 'minLength', minLength: 3 })
    expect(shortString('value')).toEqual({ type: 'valid' })
  })
  test('Is integer validation test', () => {
    expect(isValidInteger('')).toEqual({ type: 'invalidInteger' })
    expect(isValidInteger('value')).toEqual({ type: 'invalidInteger' })
    expect(isValidInteger(1)).toEqual({ type: 'valid' })
    expect(isValidInteger(1.0)).toEqual({ type: 'valid' })
  })
  test('Valid unit validation test', () => {
    expect(areUnitsValid([])).toEqual({ type: 'valid' })
    expect(areUnitsValid([{ name: 'test', to_anchor: 10 }])).toEqual({
      type: 'valid',
    })
    expect(areUnitsValid([{ name: '', to_anchor: 10 }])).toEqual({
      type: 'unitsInvalid',
    })
    expect(areUnitsValid([{ name: 'test', to_anchor: 'ewq' }])).toEqual({
      type: 'unitsInvalid',
    })
  })
})

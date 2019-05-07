import { addNewUnit, immutableEditUnit } from './helpers'

describe('Metric form helpers tests', () => {
  it('should add new Unit to array', () => {
    const units = [
      {
        name: '1',
        anchor: false,
        to_anchor: 0.2,
      },
    ]
    let result = [
      ...units,
      {
        name: '',
        anchor: false,
        to_anchor: 0.1,
      },
    ]

    expect(addNewUnit(units)).toEqual(result)

    result = [
      {
        name: '',
        anchor: false,
        to_anchor: 0.1,
      },
    ]
    expect(addNewUnit([])).toEqual(result)
  })
  it('should be immutable edit of unit on specific index', () => {
    const units = [
      {
        name: '1',
        anchor: false,
        to_anchor: 0.2,
      },
      {
        name: 'test2',
        anchor: true,
        to_anchor: 1,
      },
    ]
    const unitForEdit = {
      name: 'test2',
      anchor: false,
      to_anchor: 0.1,
    }

    const expectedResult = [
      {
        name: '1',
        anchor: false,
        to_anchor: 0.2,
      },
      {
        name: 'test2',
        anchor: false,
        to_anchor: 0.1,
      },
    ]

    expect(immutableEditUnit(units, unitForEdit, 1)).toEqual(expectedResult)
    expect(units[1].anchor).toBe(true)
    expect(units[1].to_anchor).toBe(1)
    expect(units[1].name).toBe('test2')
  })
})

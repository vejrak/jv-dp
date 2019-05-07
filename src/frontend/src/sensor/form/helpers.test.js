import {
  addNewBasicMapper,
  addNewBinaryMapper,
  addNewBinaryMixedMapper,
  removeIndexFromMapper,
} from './helpers'

describe('Sensor form helpers tests', () => {
  it('should add new binarMapper to array', () => {
    const binaryMapper = [
      {
        from_byte: 2,
        to_byte: 4,
        unit: '',
        metric: '',
        is_status: false,
      },
    ]
    let result = [
      ...binaryMapper,
      {
        from_byte: 0,
        to_byte: 0,
        unit: '',
        metric: '',
        is_status: false,
      },
    ]

    expect(addNewBinaryMapper(binaryMapper)).toEqual(result)

    result = [
      {
        from_byte: 0,
        to_byte: 0,
        unit: '',
        metric: '',
        is_status: false,
      },
    ]
    expect(addNewBinaryMapper([])).toEqual(result)
  })
  it('should add new basicMapper to array', () => {
    const basicMapper = [
      {
        source_name: 'test',
        metric: 'test',
        unit: 'test',
        is_status: true,
      },
    ]
    let result = [
      ...basicMapper,
      {
        source_name: '',
        metric: '',
        unit: '',
        is_status: false,
      },
    ]

    expect(addNewBasicMapper(basicMapper)).toEqual(result)

    result = [
      {
        source_name: '',
        metric: '',
        unit: '',
        is_status: false,
      },
    ]
    expect(addNewBasicMapper([])).toEqual(result)
  })
  it('should add new binaryMixedMapper to array', () => {
    const binaryMixedMapper = [
      {
        source_name: '',
        binaryMappers: [],
      },
    ]
    let result = [
      ...binaryMixedMapper,
      {
        source_name: '',
        binaryMappers: [],
      },
    ]

    expect(addNewBinaryMixedMapper(binaryMixedMapper)).toEqual(result)

    result = [
      {
        source_name: '',
        binaryMappers: [],
      },
    ]
    expect(addNewBinaryMixedMapper([])).toEqual(result)
  })

  it('should remove mapper from array', () => {
    const mappers = {
      jsonMappers: [
        {
          source_name: 'val1',
          metric: 'length',
          unit: 'cm',
          is_status: false,
        },
        {
          source_name: 'val2',
          metric: 'length',
          unit: 'cm',
          is_status: false,
        },
        {
          source_name: 'val3',
          metric: 'length',
          unit: 'cm',
          is_status: false,
        },
      ],
    }
    const output = removeIndexFromMapper(mappers, 1)
    expect(output.jsonMappers.length).toBe(mappers.jsonMappers.length - 1)
    expect(mappers.jsonMappers.length).toBe(3)
    expect(output.jsonMappers[0].source_name).toBe('val1')
    expect(output.jsonMappers[1].source_name).toBe('val3')
  })
})

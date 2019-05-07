// @flow

import type { BasicMapper, BinaryMixedMapper, BinaryMapper } from '../../types'

export const addNewBinaryMixedMapper = (
  binaryMixedMapper: Array<BinaryMixedMapper>,
): Array<BinaryMixedMapper> =>
  binaryMixedMapper.concat({ source_name: '', binaryMappers: [] })

export const addNewBinaryMapper = (
  binaryMapper: Array<BinaryMapper>,
): Array<BinaryMapper> =>
  binaryMapper.concat({
    from_byte: 0,
    to_byte: 0,
    unit: '',
    metric: '',
    is_status: false,
  })

export const addNewBasicMapper = (
  basicMapper: Array<BasicMapper>,
): Array<BasicMapper> =>
  basicMapper.concat({
    source_name: '',
    metric: '',
    unit: '',
    is_status: false,
  })

export const getMapperObject = (
  datasource_type: string,
  state: Object,
): ?Object => {
  if (datasource_type === 'text') {
    return { textMappers: state.textMappers }
  }
  if (datasource_type === 'json') {
    return { jsonMappers: state.jsonMappers }
  }
  if (datasource_type === 'json/binary')
    return { binaryMixedMappers: state.binaryMixedMappers }
  if (datasource_type === 'binary')
    return { binaryMappers: state.binaryMappers }
  return null
}

export const getMapper = (
  datasource_type: string,
  state: Object,
): ?Array<BasicMapper> => {
  if (datasource_type === 'text') {
    return state.textMappers
  }
  if (datasource_type === 'json') {
    return state.jsonMappers
  }
  if (datasource_type === 'json/binary') {
    return state.binaryMixedMappers
  }
  if (datasource_type === 'binary') {
    return state.binaryMappers
  }
  return null
}

export const removeIndexFromMapper = (mappers: Object, index: number) => {
  const filtredMapper = {}
  filtredMapper[Object.keys(mappers)[0]] = mappers[
    Object.keys(mappers)[0]
  ].filter((_, i) => i !== index)
  return filtredMapper
}

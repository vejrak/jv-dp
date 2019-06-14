// @flow

export type ErrorResponse = {
  errmsg: string,
}

export type MomentDiffUnit = 'days' | 'weeks' | 'months' | 'years'

export type Unit = { name: string, anchor: boolean, to_anchor: number }

export type Metric = { _id: string, name: string, units: Array<Unit> }

export type Overview = { min: number, max: number, mean: number, unit: string }

export type SensorIdMapper = {
  _id: string,
  source_name: ?string,
  content_type: string,
  separator: ?string,
  from_byte: ?number,
  to_byte: ?number,
}

export type User = {
  _id: string,
  username: string,
  rank: number,
  groups: Array<string>,
}

export type Group = {
  _id: string,
  name: string,
  description?: string,
}

export type BinaryMapper = {
  from_byte: number,
  to_byte: number,
  metric: string,
  unit: string,
  is_status: boolean,
}

export type Data = {
  _id: string,
  sensor_id: string,
  value: string,
  metric: Metric,
  unit: string,
  is_status: boolean,
  createdAt: string,
}

export type BinaryMixedMapper = {
  source_name: string,
  binaryMappers?: Array<BinaryMapper>,
}

export type BasicMapper = {
  source_name: string,
  metric: string,
  unit: string,
  is_status: boolean,
}

export type Sensor = {
  _id: string,
  identificator: string,
  description?: string,
  datasource_type: string,
  lat?: number,
  lng?: number,
  separator?: string,
  jsonMappers?: Array<BasicMapper>,
  textMappers?: Array<BasicMapper>,
  binaryMappers?: Array<BinaryMapper>,
  binaryMixedMappers?: Array<BinaryMixedMapper>,
  groups: Array<string>,
}

export type Roles = { SUPER_ADMIN: number, ADMIN: number, USER: number }

export type Options = { DATE_TIME_FORMAT: string }

export type ContentType = { JSON: string, TEXT: string, BINARY: string }

export type Datasource = {
  JSON: string,
  TEXT: string,
  JSON_BINARY: string,
  BINARY: string,
}

export type E = { [any]: empty }

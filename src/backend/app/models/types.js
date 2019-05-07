// @flow

export type FiltredUser = {
  _id: string,
  username: string,
}

export type Unit = {
  name: string,
  anchor: string,
  to_anchor: number,
}

export type Metric = {
  _id: string,
  name: string,
  units: Array<Unit>,
}

export type BinaryMapper = {
  from_byte: number,
  to_byte: number,
  metric: string,
  unit: string,
  is_status: boolean,
}

export type BinaryMixedMapper = {
  source_name: string,
  binaryMappers: ?Array<BinaryMapper>,
}

export type BasicMapper = {
  source_name: string,
  metric: string,
  unit: string,
  is_status: boolean,
}

export type Group = {
  _id: string,
  name: string,
  description: ?string,
}

export type Sensor = {
  _id: string,
  identificator: string,
  description: ?string,
  datasource_type: string,
  separator: ?string,
  jsonMappers: ?Array<BasicMapper>,
  textMappers: ?Array<BasicMapper>,
  binaryMappers: ?Array<BinaryMapper>,
  binaryMixedMappers: ?Array<BinaryMixedMapper>,
  groups: ?Array<Group>,
}

export type Data = {
  _id: string,
  sensor_id: string,
  value: string,
  metric: ?string,
  unit: ?string,
  is_status: boolean,
  createdAt: string,
}

export type User = {
  _id: string,
  username: string,
  password: string,
  rank: number,
  groups: ?Array<Group>,
}

export type SensorIdMapper = {
  _id: string,
  source_name: ?string,
  content_type: string,
  separator: ?string,
  from_byte: ?number,
  to_byte: ?number,
}

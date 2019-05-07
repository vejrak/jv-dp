// @flow

import type { Sensor } from '../types'

export const filterSensors = (
  sensors: Array<Sensor>,
  sensorSearch: string,
): Array<Sensor> => {
  if (!sensors) return []
  if (!sensorSearch) return sensors.slice(0, 10)
  return sensors
    .filter((sensor) => sensor.identificator.includes(sensorSearch))
    .slice(0, 10)
}

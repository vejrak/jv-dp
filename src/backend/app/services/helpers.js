// @flow
import Sensor from '../models/Sensor'

export const getSensor = async (sensorId: ?string) => {
  if (!sensorId) return null
  const sensor = await Sensor.findOne({ identificator: sensorId })
  if (!sensor) return await Sensor.findById(sensorId)
  return sensor
}

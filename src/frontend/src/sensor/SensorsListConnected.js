// @flow

import { connect } from 'react-redux'
import SensorsList from './SensorsList'
import { deleteSensor, editSensor, getSensors } from './actions'
import { getGroups } from '../group/actions'

export default connect(
  ({ sensor: { sensorList } }) => ({
    isFetching: sensorList.isFetching,
    error: sensorList.error,
    sensors: sensorList.sensors,
  }),
  { deleteSensor, editSensor, getSensors, getGroups },
)(SensorsList)

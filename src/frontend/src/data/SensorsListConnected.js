// @flow

import { connect } from 'react-redux'
import { getSensors } from '../sensor/actions'
import SensorsList from './SensorsList'

export default connect(
  ({ sensor: { sensorList } }) => ({
    isFetching: sensorList.isFetching,
    error: sensorList.error,
    sensors: sensorList.sensors,
  }),
  { getSensors },
)(SensorsList)

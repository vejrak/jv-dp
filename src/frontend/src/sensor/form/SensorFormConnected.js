// @flow

import { connect } from 'react-redux'
import SensorForm from './SensorForm'
import { createSensor } from '../actions'

export default connect(
  ({ consts, sensor: { sensorForm }, group: { groupList } }) => ({
    datasource: consts.datasource,
    isFetching: sensorForm.isFetching,
    groups: groupList.groups,
    error: sensorForm.error,
  }),
  { createSensor },
)(SensorForm)

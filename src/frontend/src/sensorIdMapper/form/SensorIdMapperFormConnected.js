// @flow

import { connect } from 'react-redux'
import SensorIdMapperForm from './SensorIdMapperForm'
import { createSensorIdMapper } from '../actions'

export default connect(
  ({ consts, sensorIdMapper: { sensorIdMapperForm } }) => ({
    contentType: consts.contentType,
    isFetching: sensorIdMapperForm.isFetching,
    error: sensorIdMapperForm.error,
  }),
  { createSensorIdMapper },
)(SensorIdMapperForm)

// @flow

import { connect } from 'react-redux'
import SensorIdMappersList from './SensorIdMappersList'
import {
  deleteSensorIdMapper,
  editSensorIdMapper,
  getSensorIdMappers,
} from './actions'

export default connect(
  ({ sensorIdMapper: { sensorIdMapperList } }) => ({
    isFetching: sensorIdMapperList.isFetching,
    error: sensorIdMapperList.error,
    sensorIdMappers: sensorIdMapperList.sensorIdMappers,
  }),
  { deleteSensorIdMapper, editSensorIdMapper, getSensorIdMappers },
)(SensorIdMappersList)

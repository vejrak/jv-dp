// @flow

import { connect } from 'react-redux'
import {
  getData,
  getSensorDataMetrics,
  getStatusData,
  resetSensorDetail,
} from '../actions'
import SensorDetail from './SensorDetail'

export default connect(
  ({ data: { dataList, sensorDataMetrics, statusData } }) => ({
    isFetchingData: dataList.isFetching,
    isFetching: sensorDataMetrics.isFetching || statusData.isFetching,
    dataCollection: dataList.dataCollection,
    statusData: statusData.statusData,
    metrics: sensorDataMetrics.metrics,
    error: dataList.error || sensorDataMetrics.error || statusData.error,
  }),
  { getData, getStatusData, getSensorDataMetrics, resetSensorDetail },
)(SensorDetail)

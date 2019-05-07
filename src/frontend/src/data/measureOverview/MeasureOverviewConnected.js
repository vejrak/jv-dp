// @flow

import { connect } from 'react-redux'
import { getDataOverview } from '../actions'
import { getSensors } from '../../sensor/actions'
import MeasureOverview from './MeasureOverview'

export default connect(
  ({ data: { dataOverview }, sensor: { sensorList } }) => ({
    isFetching: sensorList.isFetching,
    isFetchingData: dataOverview.isFetching,
    overview: dataOverview.overview,
    sensors: sensorList.sensors,
    errorData: dataOverview.error,
    error: sensorList.error,
  }),
  { getDataOverview, getSensors },
)(MeasureOverview)

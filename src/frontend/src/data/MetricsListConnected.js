// @flow

import { connect } from 'react-redux'
import MetricsList from './MetricsList'
import { getMetrics } from '../metric/actions'

export default connect(
  ({ metric: { metricList } }) => ({
    isFetching: metricList.isFetching,
    metrics: metricList.metrics,
    error: metricList.error,
  }),
  { getMetrics },
)(MetricsList)

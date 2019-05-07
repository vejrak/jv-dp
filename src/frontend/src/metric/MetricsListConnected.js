// @flow

import { connect } from 'react-redux'
import MetricsList from './MetricsList'
import { deleteMetric, getMetrics, editMetric } from './actions'

export default connect(
  ({ metric: { metricList } }) => ({
    isFetching: metricList.isFetching,
    metrics: metricList.metrics,
    error: metricList.error,
  }),
  { deleteMetric, getMetrics, editMetric },
)(MetricsList)

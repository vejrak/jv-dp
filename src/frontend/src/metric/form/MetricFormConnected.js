// @flow

import { connect } from 'react-redux'
import MetricForm from './MetricForm'
import { createMetric } from '../actions'

export default connect(
  ({ metric: { metricForm } }) => ({
    isFetching: metricForm.isFetching,
    error: metricForm.error,
  }),
  { createMetric },
)(MetricForm)

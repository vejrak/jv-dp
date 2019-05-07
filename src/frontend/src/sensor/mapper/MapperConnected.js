// @flow

import { connect } from 'react-redux'
import Mapper from './Mapper'
import { getMetrics } from '../../metric/actions'

export default connect(
  ({ metric: { metricList } }) => ({
    isFetching: metricList.isFetching,
    metrics: metricList.metrics,
  }),
  { getMetrics },
)(Mapper)

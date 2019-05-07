// @flow

import React from 'react'
import MetricForm from './form/MetricFormConnected'
import MetricList from './MetricsListConnected'

const Metrics = () => (
  <div>
    <div className="shadow-lg p-3 mb-3 bg-white rounded mt-3">
      <h2> Create new metric</h2>
      <MetricForm />
    </div>
    <div className="shadow-lg p-3 mb-3 bg-white rounded">
      <h2> Metrics </h2>
      <MetricList />
    </div>
  </div>
)

export default Metrics

// @flow

import React from 'react'
import SensorList from './SensorsListConnected'
import MetricList from './MetricsListConnected'
import SensorDetail from './sensorDetail'
import MeasureOverview from './measureOverview'

type State = {
  showDetail: ?string,
  showMetricOverview: ?string,
}

type Props = {}

class Data extends React.PureComponent<Props, State> {
  state = {
    showDetail: null,
    showMetricOverview: null,
  }

  setShowDetail = (id: string) => {
    this.setState({ showDetail: id, showMetricOverview: null })
  }

  setShowMetricOverview = (measure: string) => {
    this.setState({ showDetail: null, showMetricOverview: measure })
  }

  resetState = () => {
    this.setState({ showDetail: null, showMetricOverview: null })
  }

  render() {
    const { showDetail, showMetricOverview } = this.state
    if (showMetricOverview)
      return (
        <MeasureOverview
          backToList={this.resetState}
          metricId={showMetricOverview}
          showDetail={this.setShowDetail}
        />
      )
    if (showDetail)
      return <SensorDetail backToList={this.resetState} sensorId={showDetail} />
    return (
      <>
        <SensorList showDetail={this.setShowDetail} />
        <MetricList showMetricOverview={this.setShowMetricOverview} />
      </>
    )
  }
}

export default Data

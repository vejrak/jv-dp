// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import { getMetrics } from '../metric/actions'
import type { ErrorResponse, Metric } from '../types'
import Spinner from '../components/Spinner'

type Props = $ReadOnly<{|
  getMetrics: typeof getMetrics,
  isFetching: boolean,
  error: ?ErrorResponse,
  metrics: Array<Metric>,
  showMetricOverview: Function,
|}>

class MetricsList extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.getMetrics()
  }

  render() {
    const { error, isFetching, metrics, showMetricOverview } = this.props

    if (isFetching) return <Spinner />

    if (error)
      return (
        <div className="alert alert-danger" role="alert">
          {error.errmsg}
        </div>
      )

    if (!metrics || metrics.length === 0) return null
    return (
      <>
        <h2>Metrics</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th />
            </tr>
          </thead>
          {metrics.map((metric) => (
            <tbody key={metric._id} className="mt-4">
              <tr>
                <td>{metric.name}</td>
                <td>
                  <Button
                    className="ml-5"
                    onClick={() => {
                      showMetricOverview(metric._id)
                    }}
                  >
                    Show overall
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </>
    )
  }
}

export default MetricsList

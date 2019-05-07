// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import { CSVLink } from 'react-csv'
import find from 'lodash/find'
import { getData, getStatusData, getSensorDataMetrics } from '../actions'
import type { Data, ErrorResponse, Metric, MomentDiffUnit } from '../../types'
import Spinner from '../../components/Spinner'
import Graph from './Graph'

type Props = $ReadOnly<{|
  error: ?ErrorResponse,
  isFetching: boolean,
  isFetchingData: boolean,
  // eslint-disable-next-line
  dataCollection: Array<Data>,
  statusData: Array<Data>,
  getData: typeof getData,
  getStatusData: typeof getStatusData,
  getSensorDataMetrics: typeof getSensorDataMetrics,
  sensorId: string,
  // eslint-disable-next-line
  metrics: Array<Metric>,
  backToList: Function,
|}>

type State = {
  metric: ?Metric,
  lastDateUnit: MomentDiffUnit | 'all',
  unit: ?string,
  filterByMetric: boolean,
}

class SensorDetail extends React.PureComponent<Props, State> {
  state = {
    metric: null,
    lastDateUnit: 'weeks',
    unit: null,
    filterByMetric: true,
  }

  componentDidMount() {
    const { getSensorDataMetrics, getStatusData, sensorId } = this.props
    getSensorDataMetrics(sensorId)
    getStatusData(sensorId)
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { getData, sensorId, metrics } = this.props
    const { unit, metric, filterByMetric, lastDateUnit } = this.state
    const {
      unit: prevUnit,
      metric: prevMetric,
      filterByMetric: filterByMetricPrev,
      lastDateUnit: lastDateUnitPrev,
    } = prevState
    if (
      metrics &&
      (unit !== prevUnit ||
        metric !== prevMetric ||
        filterByMetric !== filterByMetricPrev ||
        lastDateUnit !== lastDateUnitPrev)
    ) {
      if (metric && unit && filterByMetric)
        getData(sensorId, metric._id, unit, lastDateUnit)
      else getData(sensorId, null, null, lastDateUnit)
    }
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { metrics } = props
    const { unit, metric } = state
    if (metrics && !metric) {
      const metric = metrics[0] || null
      const newUnit =
        unit || (metric && metric.units.length && metric.units[0].name) || null
      return {
        metric,
        unit: newUnit,
      }
    }
    return state
  }

  handleChange = (value: Object): void => {
    this.setState({ ...value })
  }

  render() {
    const {
      backToList,
      dataCollection,
      isFetching,
      isFetchingData,
      metrics,
      statusData,
      error,
    } = this.props
    const { lastDateUnit, filterByMetric, metric, unit } = this.state

    if (isFetching || (isFetchingData && !filterByMetric)) return <Spinner />

    return (
      <div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error.errmsg}
          </div>
        )}
        <Button className="small" onClick={backToList}>
          Back
        </Button>
        <div className="mt-3">
          <CSVLink data={dataCollection}>Download data as CSV</CSVLink>
        </div>
        <div className="mt-3">
          <CSVLink data={statusData}>Download STATUS data as CSV</CSVLink>
        </div>
        <div className="form-check form-check-inline mt-3">
          <input
            checked={filterByMetric}
            className="form-check-input mb-3"
            id="filterByMetric"
            onChange={() => {
              this.handleChange({ filterByMetric: !filterByMetric })
            }}
            style={{ width: '15px', height: '15px' }}
            type="checkbox"
            value={filterByMetric}
          />
          <label className="form-check-label mb-3" htmlFor="filterByMetric">
            Filter by metric
          </label>
        </div>
        {metric && filterByMetric && (
          <div className="mt-3 mb-3 row">
            <div className="col">
              <label class-name="mt-2" htmlFor="metric">
                Metric
              </label>
              <select
                className="form-control mb-3"
                id="metric"
                onChange={({ target }) =>
                  this.handleChange({
                    metric: find(metrics, (o) => o._id === target.value),
                  })
                }
                value={metric}
              >
                {metrics.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <label class-name="mt-2" htmlFor="lastDateUnit">
                Last
              </label>
              <select
                className="form-control mb-3"
                id="lastDateUnit"
                onChange={({ target }) =>
                  this.handleChange({ lastDateUnit: target.value })
                }
                value={lastDateUnit}
              >
                <option value="all">all</option>
                <option value="years">year</option>
                <option value="months">month</option>
                <option value="weeks">week</option>
                <option value="days">day</option>
              </select>
            </div>
            {metric.units && metric.units.length && (
              <div className="col">
                <label htmlFor="unit mt-2">Select Unit</label>
                <select
                  className="form-control mb-3"
                  index="unit"
                  onChange={({ target }) =>
                    this.handleChange({ unit: target.value })
                  }
                  value={unit}
                >
                  {metric.units.map((value) => (
                    <option key={value.name} value={value.name}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {isFetchingData ? (
              <div className="col-12 mt-3">
                <Spinner />
              </div>
            ) : (
              unit && dataCollection && <Graph data={dataCollection} />
            )}
            {statusData.length > 0 && (
              <div className="mt-5 col-12">
                <h3 className="pt-1 pb-1">Last 10 status sent by sensor</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Code</th>
                      <th scope="col">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statusData.slice(-5).map((item, key) => (
                      <tr>
                        <th scope="row">{key + 1}</th>
                        <td>{item.value}</td>
                        <td>{item.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default SensorDetail

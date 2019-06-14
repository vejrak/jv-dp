// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import { CSVLink } from 'react-csv'
import {
  getData,
  getStatusData,
  getSensorDataMetrics,
  resetSensorDetail,
} from '../actions'
import type { Data, ErrorResponse, Metric, MomentDiffUnit } from '../../types'
import Spinner from '../../components/Spinner'
import Graph from './Graph'
import { getMetricById, getFirstUnitOfMetric } from '../../helpers'
import StatusList from './StatusList'

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
  resetSensorDetail: typeof resetSensorDetail,
  sensorId: string,
  // eslint-disable-next-line
  metrics: Array<Metric>,
  backToList: Function,
|}>

type State = {
  metric: string,
  lastDateUnit: MomentDiffUnit | 'all',
  unit: ?string,
  filterByMetric: boolean,
}

const defaultState = {
  metric: '',
  lastDateUnit: 'all',
  unit: null,
  filterByMetric: true,
}

class SensorDetail extends React.PureComponent<Props, State> {
  state = {
    ...defaultState,
  }

  async componentDidMount() {
    const { getSensorDataMetrics, getStatusData, sensorId } = this.props
    await getSensorDataMetrics(sensorId)
    getStatusData(sensorId)
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { metrics, sensorId, getData } = props
    const { unit, metric, lastDateUnit } = state
    if (metrics && !metric) {
      const metric = metrics[0] || ''
      const newUnit =
        unit || (metric && metric.units.length && metric.units[0].name) || null
      if (metric && newUnit)
        getData(sensorId, metric._id, newUnit, lastDateUnit)
      return {
        metric: metric ? metric._id : '',
        unit: newUnit,
      }
    }
    return state
  }

  handleChange = (value: Object): void => {
    this.setState({ ...value }, () => {
      const { getData, sensorId } = this.props
      const { metric, unit, lastDateUnit, filterByMetric } = this.state
      if (metric && unit && filterByMetric)
        getData(sensorId, metric, unit, lastDateUnit)
      else getData(sensorId, null, null, lastDateUnit)
    })
  }

  goBack = async () => {
    await this.props.resetSensorDetail()
    this.setState(
      {
        ...defaultState,
      },
      () => {
        this.props.backToList()
      },
    )
  }

  render() {
    const {
      dataCollection,
      isFetching,
      isFetchingData,
      metrics,
      statusData,
      error,
    } = this.props
    const { lastDateUnit, filterByMetric, metric: metricId, unit } = this.state

    if (isFetching || (isFetchingData && !filterByMetric)) return <Spinner />
    const metric = getMetricById(metricId, metrics)

    return (
      <div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error.errmsg}
          </div>
        )}
        <Button className="small" onClick={this.goBack}>
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
              this.handleChange({
                filterByMetric: !filterByMetric,
                lastDateUnit: !filterByMetric ? lastDateUnit : 'all',
              })
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
                onChange={({ target }) => {
                  const metric = getMetricById(target.value, metrics)
                  this.handleChange({
                    metric: target.value,
                    unit: getFirstUnitOfMetric(metric),
                  })
                }}
                value={metricId}
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
            <StatusList statusData={statusData} />
          </div>
        )}
      </div>
    )
  }
}

export default SensorDetail

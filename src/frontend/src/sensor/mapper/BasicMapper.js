// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import find from 'lodash/find'
import some from 'lodash/some'
import type { Metric } from '../../types'

type Props = $ReadOnly<{|
  index: number,
  source_name?: string,
  metric?: string,
  unit?: string,
  is_status?: boolean,
  removeMapper: Function,
  editMapper: Function,
  metrics: Array<Metric>,
|}>

type State = {
  source_name: string,
  metric: string,
  unit: string,
  is_status: boolean,
}

class MapperForm extends React.PureComponent<Props, State> {
  state = {
    source_name: this.props.source_name || '',
    metric: this.props.metric || '',
    unit: this.props.unit || '',
    is_status: this.props.is_status || false,
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { metrics } = props
    const { metric, unit } = state
    if (metrics.length > 0 && metric === '') {
      if (metrics[0].units.length > 0 && unit === '') {
        return { metric: metrics[0]._id, unit: metrics[0].units[0].name }
      }
      return {
        metric: metrics[0]._id,
      }
    }

    return null
  }

  componentDidMount() {
    this.props.editMapper({ ...this.state })
  }

  handleChange = (value: Object) => {
    this.setState({ ...value }, () => this.props.editMapper({ ...this.state }))
  }

  render() {
    const { is_status, source_name, unit, metric } = this.state
    const { index, removeMapper, metrics } = this.props

    return (
      <div>
        <h3>{`Mapper ${index + 1}`}</h3>
        <label htmlFor={`source_name${index}`}>Source name</label>
        <input
          className="form-control mt-2"
          index={`source_name${index}`}
          name={`source_name${index}`}
          onChange={({ target }) =>
            this.handleChange({ source_name: target.value })
          }
          type="text"
          value={source_name}
        />
        <small className="form-text text-muted mb-3" id="sourceNameHelp">
          Path to value in JSON document or text Example for receive value in
          JSON:
          <br />
          {'key.value => {key: value}'}
        </small>

        {!is_status && (
          <>
            <label className="mt-2" htmlFor={`metric${index}`}>
              Metrics
            </label>
            <select
              className="form-control"
              index={`metric${index}`}
              onChange={({ target }) =>
                this.handleChange({ metric: target.value })
              }
              value={metric}
            >
              {metrics.map((value) => (
                <option key={value._id} value={value._id}>
                  {value.name}
                </option>
              ))}
            </select>
            {metric && (
              <>
                <label className="mt-2" htmlFor={`unit${index}`}>
                  Select Unit
                </label>
                <select
                  className="form-control"
                  index={`unit${index}`}
                  onChange={({ target }) =>
                    this.handleChange({ unit: target.value })
                  }
                  value={unit}
                >
                  {metrics.length > 0 &&
                    some(metrics, { _id: metric }) &&
                    find(metrics, (o) => o._id === metric).units.map(
                      (value) => (
                        <option key={value.name} value={value.name}>
                          {value.name}
                        </option>
                      ),
                    )}
                </select>
              </>
            )}
          </>
        )}
        <div className="form-check form-check-inline mt-3 col">
          <input
            checked={is_status}
            className="form-check-input mb-1"
            id="isStatus"
            onChange={() => {
              this.handleChange({ is_status: !is_status })
            }}
            style={{ width: '15px', height: '15px' }}
            type="checkbox"
            value={is_status}
          />
          <label className="form-check-label mb-1" htmlFor="isStatus">
            Is status
          </label>
        </div>
        <small className="form-text text-muted mb-3" id="isStatusHelp">
          Value will hold only status data
        </small>

        <Button
          className="btn btn-danger mt-3"
          onClick={() => {
            if (window.confirm('Are you sure you wish to delete this item?'))
              removeMapper()
          }}
        >
          Delete
        </Button>
      </div>
    )
  }
}

export default MapperForm

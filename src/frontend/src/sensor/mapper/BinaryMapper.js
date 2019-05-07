// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import find from 'lodash/find'
import some from 'lodash/some'
import type { Metric } from '../../types'

type Props = $ReadOnly<{
  index: number,
  from_byte?: number,
  to_byte?: number,
  metric?: string,
  unit?: string,
  is_status?: boolean,
  editMapper: Function,
  removeMapper: Function,
  metrics: Array<Metric>,
}>

type State = {
  from_byte: number,
  to_byte: number,
  metric: string,
  unit: string,
  is_status: boolean,
}

class BinaryMapper extends React.PureComponent<Props, State> {
  state = {
    from_byte: this.props.from_byte || 0,
    to_byte: this.props.to_byte || 0,
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

  handleChange = (value: Object): void => {
    this.setState({ ...value }, () => this.props.editMapper({ ...this.state }))
  }

  render() {
    const { from_byte, to_byte, metric, is_status, unit } = this.state
    const { index, metrics, removeMapper } = this.props

    return (
      <div>
        <h3 className="mt-3">{`Binary mapper ${index + 1}`}</h3>
        <label htmlFor={`from_byte${index}`}>From byte</label>
        <input
          className="form-control mt-2 mb-3"
          index={`from_byte${index}`}
          name={`from_byte${index}`}
          onChange={({ target }) =>
            this.handleChange({ from_byte: target.value })
          }
          type="text"
          value={from_byte}
        />
        <label htmlFor={`to_byte${index}`}>To byte</label>
        <input
          className="form-control mt-2"
          index={`to_byte${index}`}
          name={`to_byte${index}`}
          onChange={({ target }) =>
            this.handleChange({ to_byte: target.value })
          }
          type="text"
          value={to_byte}
        />
        <small className="form-text text-muted" id="separatorHelp">
          Input string &quot;fabacde&quot; from byte 3 - to byte 4 =&gt;
          &quot;ba&quot;
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
            className="form-check-input mb-3"
            id="filterByMetric"
            onChange={() => {
              this.handleChange({ is_status: !is_status })
            }}
            style={{ width: '15px', height: '15px' }}
            type="checkbox"
            value={is_status}
          />
          <label className="form-check-label mb-1" htmlFor="filterByMetric">
            Is status
          </label>
        </div>
        <small className="form-text text-muted mb-3" id="isStatusHelp">
          Value will hold only status data
        </small>
        <Button
          className="mt-3 mb-3 btn d-block btn-danger"
          onClick={() => {
            if (window.confirm('Are you sure you wish to delete this item?'))
              removeMapper()
          }}
        >
          Remove binary mapper
        </Button>
      </div>
    )
  }
}

export default BinaryMapper

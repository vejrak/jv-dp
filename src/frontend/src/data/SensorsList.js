// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import { getSensors } from '../sensor/actions'
import type { ErrorResponse, Sensor } from '../types'
import Spinner from '../components/Spinner'
import Input from '../components/Input'
import { filterSensors } from './helpers'

type Props = $ReadOnly<{|
  getSensors: typeof getSensors,
  isFetching: boolean,
  error: ?ErrorResponse,
  sensors: Array<Sensor>,
  showDetail: Function,
|}>

type State = {
  sensorSearch: string,
}

class SensorsList extends React.PureComponent<Props, State> {
  state = {
    sensorSearch: '',
  }

  componentDidMount() {
    this.props.getSensors()
  }

  handleChange = (sensorSearch: Object) => {
    this.setState(sensorSearch)
  }

  render() {
    const { isFetching, error, sensors, showDetail } = this.props
    const { sensorSearch } = this.state
    const filtredSensors = filterSensors(sensors, sensorSearch)
    if (isFetching) return <Spinner />

    if (error)
      return (
        <div className="alert alert-danger" role="alert">
          {error.errmsg}
        </div>
      )

    if (!sensors || sensors.length === 0) return null
    return (
      <>
        <h2>Sensors</h2>
        <label class-name="mt-2" htmlFor="sensorSearch">
          Search sensor
        </label>
        <Input
          className="form-control mb-3"
          id="sensorSearch"
          name="sensorSearch"
          onChange={({ target }) =>
            this.handleChange({ sensorSearch: target.value })
          }
          value={sensorSearch}
        />
        {filtredSensors.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Identificator</th>
                <th scope="col">Description</th>
                <th />
              </tr>
            </thead>
            {filtredSensors.map((sensor) => (
              <tbody key={sensor._id} className="mb-4">
                <tr>
                  <td>{sensor.identificator}</td>
                  <td>{sensor.description}</td>
                  <td>
                    <Button onClick={() => showDetail(sensor._id)}>
                      {' '}
                      Show{' '}
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        )}
      </>
    )
  }
}

export default SensorsList

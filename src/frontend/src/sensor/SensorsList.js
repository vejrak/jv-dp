// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import filter from 'lodash/filter'
import { deleteSensor, editSensor, getSensors } from './actions'
import { getGroups } from '../group/actions'
import { canShowUpdateForm } from '../helpers'
import SensorForm from './form'
import type { ErrorResponse, Sensor } from '../types'
import Spinner from '../components/Spinner'

type Props = $ReadOnly<{|
  deleteSensor: typeof deleteSensor,
  getSensors: typeof getSensors,
  getGroups: typeof getGroups,
  editSensor: typeof editSensor,
  isFetching: boolean,
  error: ?ErrorResponse,
  sensors: Array<Sensor>,
|}>

type State = {
  showEditFormsFor: Array<string>,
}

class SensorsList extends React.PureComponent<Props, State> {
  state = {
    showEditFormsFor: [],
  }

  componentDidMount() {
    this.props.getSensors()
    this.props.getGroups()
  }

  handleEditClick = (_id: string): void => {
    const { showEditFormsFor } = this.state
    this.setState({ showEditFormsFor: showEditFormsFor.concat(_id) })
  }

  handleHideClick = (_id: string): void => {
    const { showEditFormsFor } = this.state
    this.setState({
      showEditFormsFor: filter(showEditFormsFor, _id),
    })
  }

  updateSensor = (_id: string): Function => (sensor: Sensor): void => {
    this.props.editSensor(sensor, _id)
  }

  handleDeleteClick = async (_id: string) => {
    await this.props.deleteSensor(_id)
  }

  render() {
    const { showEditFormsFor } = this.state
    const { isFetching, error, sensors } = this.props

    if (isFetching) return <Spinner />

    if (error)
      return (
        <div className="alert alert-danger" role="alert">
          {error.errmsg}
        </div>
      )

    if (!sensors || sensors.length === 0) return null
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Identificator</th>
            <th scope="col">Description</th>
            <th scope="col">Datasource</th>
            <th scope="col">Separator</th>
            <th />
            <th />
          </tr>
        </thead>
        {sensors.map((sensor) => (
          <tbody key={sensor._id} className="mb-4">
            <tr>
              <td>{sensor.identificator}</td>
              <td>{sensor.description}</td>
              <td>{sensor.datasource_type}</td>
              <td>{sensor.separator}</td>
              <td>
                <Button
                  className="mt-3 mb-3 btn d-block btn-danger"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you wish to delete this item?',
                      )
                    )
                      this.handleDeleteClick(sensor._id)
                  }}
                >
                  Delete
                </Button>
              </td>
              {!canShowUpdateForm(showEditFormsFor, sensor._id) && (
                <td>
                  <Button
                    className="mt-3 mb-3"
                    onClick={() => this.handleEditClick(sensor._id)}
                  >
                    Edit
                  </Button>
                </td>
              )}
            </tr>
            {canShowUpdateForm(showEditFormsFor, sensor._id) && (
              <>
                <tr>
                  <td colSpan="4">
                    <SensorForm
                      sensor={sensor}
                      updateSensor={this.updateSensor(sensor._id)}
                    />
                  </td>
                  <td>
                    <Button
                      className="mt-3 mb-3"
                      onClick={() => this.handleHideClick(sensor._id)}
                    >
                      Hide
                    </Button>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        ))}
      </table>
    )
  }
}

export default SensorsList

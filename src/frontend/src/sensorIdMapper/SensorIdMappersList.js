// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import filter from 'lodash/filter'
import {
  deleteSensorIdMapper,
  editSensorIdMapper,
  getSensorIdMappers,
} from './actions'
import { canShowUpdateForm } from '../helpers'
import type { ErrorResponse, SensorIdMapper } from '../types'
import SensorIdMapperForm from './form/SensorIdMapperFormConnected'
import Spinner from '../components/Spinner'

type Props = $ReadOnly<{|
  deleteSensorIdMapper: typeof deleteSensorIdMapper,
  editSensorIdMapper: typeof editSensorIdMapper,
  getSensorIdMappers: typeof getSensorIdMappers,
  isFetching: boolean,
  error: ?ErrorResponse,
  sensorIdMappers: Array<SensorIdMapper>,
|}>

type State = {
  showEditFormsFor: Array<string>,
}

class SensorIdMappersList extends React.PureComponent<Props, State> {
  state = {
    showEditFormsFor: [],
  }

  componentDidMount() {
    this.props.getSensorIdMappers()
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

  handleDeleteClick = async (_id: string) => {
    await this.props.deleteSensorIdMapper(_id)
  }

  updateSensorIdMapper = (_id: string): Function => (
    sensorIdMapper: SensorIdMapper,
  ): void => {
    this.props.editSensorIdMapper(sensorIdMapper, _id)
  }

  render() {
    const { showEditFormsFor } = this.state
    const { error, isFetching, sensorIdMappers } = this.props

    if (isFetching) return <Spinner />

    if (error)
      return (
        <div className="alert alert-danger" role="alert">
          {error.errmsg}
        </div>
      )

    if (!sensorIdMappers || sensorIdMappers.length === 0) return null
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Content type</th>
            <th />
            <th />
          </tr>
        </thead>
        {sensorIdMappers.map((sensorIdMapper) => (
          <tbody key={sensorIdMapper._id} className="mb-4">
            <tr>
              <td>{sensorIdMapper.source_name}</td>
              <td>{sensorIdMapper.content_type}</td>
              <td>
                <Button
                  className="mt-3 mb-3 btn d-block btn-danger"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you wish to delete this item?',
                      )
                    )
                      this.handleDeleteClick(sensorIdMapper._id)
                  }}
                >
                  Delete
                </Button>
              </td>
              {!canShowUpdateForm(showEditFormsFor, sensorIdMapper._id) && (
                <td>
                  <Button
                    className="mt-3 mb-3"
                    onClick={() => this.handleEditClick(sensorIdMapper._id)}
                  >
                    Edit
                  </Button>
                </td>
              )}
            </tr>
            {canShowUpdateForm(showEditFormsFor, sensorIdMapper._id) && (
              <>
                <tr>
                  <td colSpan={2}>
                    <SensorIdMapperForm
                      sensorIdMapper={sensorIdMapper}
                      updateSensorIdMapper={this.updateSensorIdMapper(
                        sensorIdMapper._id,
                      )}
                    />
                  </td>
                  <td>
                    <Button
                      className="mt-3 mb-3"
                      onClick={() => this.handleHideClick(sensorIdMapper._id)}
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

export default SensorIdMappersList

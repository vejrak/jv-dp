// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import filter from 'lodash/filter'
import { canShowUpdateForm } from '../helpers'
import MetricForm from './form'
import { deleteMetric, getMetrics, editMetric } from './actions'
import type { ErrorResponse, Metric } from '../types'
import Spinner from '../components/Spinner'

type Props = $ReadOnly<{|
  deleteMetric: typeof deleteMetric,
  getMetrics: typeof getMetrics,
  editMetric: typeof editMetric,
  isFetching: boolean,
  error: ?ErrorResponse,
  metrics: Array<Metric>,
|}>

type State = {
  showEditFormsFor: Array<string>,
}

class MetricsList extends React.PureComponent<Props, State> {
  state = {
    showEditFormsFor: [],
  }

  componentDidMount() {
    this.props.getMetrics()
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

  updateMetric = (_id: string): Function => (metric: Metric): void => {
    this.props.editMetric(metric, _id)
  }

  handleDeleteClick = async (_id: string) => {
    await this.props.deleteMetric(_id)
  }

  render() {
    const { showEditFormsFor } = this.state
    const { error, isFetching, metrics } = this.props

    if (isFetching) return <Spinner />

    if (error)
      return (
        <div className="alert alert-danger" role="alert">
          {error.errmsg}
        </div>
      )

    if (!metrics || metrics.length === 0) return null
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th />
            <th />
          </tr>
        </thead>
        {metrics.map((metric) => (
          <tbody key={metric._id} className="mt-4">
            <tr>
              <td>{metric.name}</td>
              <td>
                <Button
                  className="mt-3 mb-3 btn d-block btn-danger"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you wish to delete this item?',
                      )
                    )
                      this.handleDeleteClick(metric._id)
                  }}
                >
                  Delete
                </Button>
              </td>
              {!canShowUpdateForm(showEditFormsFor, metric._id) && (
                <td>
                  <Button
                    className="mt-3 mb-3"
                    onClick={() => this.handleEditClick(metric._id)}
                  >
                    Edit
                  </Button>
                </td>
              )}
            </tr>
            {canShowUpdateForm(showEditFormsFor, metric._id) && (
              <tr>
                <td colSpan="2">
                  <MetricForm
                    {...metric}
                    updateMetric={this.updateMetric(metric._id)}
                  />
                </td>
                <td align="right" className="align-top">
                  <Button
                    className="mt-3 mb-3"
                    onClick={() => this.handleHideClick(metric._id)}
                  >
                    Hide
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        ))}
      </table>
    )
  }
}

export default MetricsList

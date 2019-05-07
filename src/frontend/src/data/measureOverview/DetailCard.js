// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import type { ErrorResponse, Overview, Sensor } from '../../types'
import Spinner from '../../components/Spinner'

type Props = $ReadOnly<{|
  overview: ?Overview,
  sensor: Sensor,
  showDetail: Function,
  isFetching: boolean,
  error: ?ErrorResponse,
|}>

const DetailCard = ({
  overview,
  sensor,
  showDetail,
  isFetching,
  error,
}: Props) => {
  if (isFetching) return <Spinner />
  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {error.errmsg}
      </div>
    )
  if (!overview) return null
  return (
    <div className="card mb-2 mt-2 w-25">
      <div className="card-body">
        <h5 className="card-title">Identificator: {sensor.identificator}</h5>
        <p className="card-text">Description: {sensor.description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          Min value: {overview.min} {overview.unit}
        </li>
        <li className="list-group-item">
          Max value: {overview.max} {overview.unit}
        </li>
        <li className="list-group-item">
          Mean value: {overview.mean} {overview.unit}
        </li>
        <li className="list-group item">
          <Button className="small m-1" onClick={() => showDetail(sensor._id)}>
            Detail
          </Button>
        </li>
      </ul>
    </div>
  )
}

export default DetailCard

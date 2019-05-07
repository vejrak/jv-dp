// @flow

import { Button } from 'react-bootstrap'
import React from 'react'
import DetailCard from './DetailCard'
import Map from './Map'
import Spinner from '../../components/Spinner'
import { getDataOverview } from '../actions'
import { getSensors } from '../../sensor/actions'
import type { ErrorResponse, Overview, Sensor } from '../../types'

type Props = {
  error: ?ErrorResponse,
  errorData: ?ErrorResponse,
  isFetching: boolean,
  isFetchingData: boolean,
  overview: ?Overview,
  sensors: Array<Sensor>,
  getDataOverview: typeof getDataOverview,
  getSensors: typeof getSensors,
  showDetail: Function,
  metricId: string,
  backToList: Function,
}

type State = {
  sensor: ?Sensor,
}

class MeasureOverview extends React.PureComponent<Props, State> {
  state = { sensor: null }

  componentDidMount() {
    const { getSensors } = this.props
    getSensors()
  }

  showItemDetail = (sensor: Sensor) => {
    const { getDataOverview, metricId } = this.props
    this.setState({ sensor })
    getDataOverview(metricId, sensor._id)
  }

  render() {
    const {
      backToList,
      overview,
      isFetching,
      isFetchingData,
      error,
      errorData,
      sensors,
      showDetail,
    } = this.props
    const { sensor } = this.state

    if (isFetching) return <Spinner />

    return (
      <div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error.errmsg}
          </div>
        )}
        <Button className="small mb-3" onClick={backToList}>
          Back
        </Button>
        {sensor && (
          <DetailCard
            error={errorData}
            isFetching={isFetchingData}
            overview={overview}
            sensor={sensor}
            showDetail={showDetail}
          />
        )}
        {sensors.length > 0 && (
          <Map sensors={sensors} showItemDetail={this.showItemDetail} />
        )}
      </div>
    )
  }
}

export default MeasureOverview

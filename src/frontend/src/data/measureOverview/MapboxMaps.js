// @flow

import React, { Component } from 'react'
import MapGL, { Marker, NavigationControl } from 'react-map-gl'
import env from '../../../env'
import marker from './marker.png'
import type { Sensor } from '../../types'

const { MAPBOX_TOKEN } = env

type Props = {
  sensors: Array<Sensor>,
  showItemDetail: Function,
}

type ViewState = {
  latitude: ?number,
  longitude: ?number,
  zoom: ?number,
  bearing: ?number,
  pitch: ?number,
}

type State = {
  viewState: ViewState,
}

class MapboxMaps extends Component<Props, State> {
  state = {
    viewState: {
      latitude: null,
      longitude: null,
      zoom: null,
      bearing: null,
      pitch: null,
    },
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (!state.viewState.latitude && props.sensors.length) {
      return {
        viewState: {
          latitude: props.sensors[0].lat,
          longitude: props.sensors[0].lng,
          zoom: 11,
          bearing: 0,
          pitch: 50,
        },
      }
    }
    return state
  }

  onViewportChange = (viewState: ViewState) => {
    this.setState({ viewState })
  }

  render() {
    const { sensors, showItemDetail } = this.props
    const { viewState } = this.state

    if (!viewState.latitude) return null
    return (
      <MapGL
        {...viewState}
        height="400px"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={this.onViewportChange}
        reuseMaps
        width="100%"
      >
        <div style={{ position: 'absolute', right: 0 }}>
          <NavigationControl onViewportChange={this.onViewportChange} />
        </div>
        {sensors.map((sensor) => (
          <Marker
            key={sensor.identificator}
            latitude={sensor.lat}
            longitude={sensor.lng}
          >
            <div onClick={() => showItemDetail(sensor)}>
              <img alt="marker" height="30" src={marker} width="30" />
            </div>
          </Marker>
        ))}
      </MapGL>
    )
  }
}

export default MapboxMaps

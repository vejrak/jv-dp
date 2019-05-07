// @flow

import React from 'react'
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps'
import type { Sensor } from '../../types'
import env from '../../../env'

const { GOOGLE_MAP_TOKEN } = env

type Props = {
  sensors: Array<Sensor>,
  showItemDetail: Function,
}

const GoogleMaps = compose(
  // $FlowFixMe
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_TOKEN}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)((props: Props) => (
  <GoogleMap
    defaultCenter={{
      lat: props.sensors[0].lat,
      lng: props.sensors[0].lng,
    }}
    defaultZoom={8}
  >
    {props.sensors.map((sensor) => (
      <Marker
        key={sensor._id}
        onClick={() => props.showItemDetail(sensor)}
        position={{ lat: sensor.lat, lng: sensor.lng }}
      />
    ))}
  </GoogleMap>
))

export default GoogleMaps

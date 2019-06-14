// @flow

import React from 'react'
import type { Sensor } from '../../types'
import GoogleMaps from './GoogleMaps'
import MapboxMaps from './MapboxMaps'
import env from '../../../env'

const { GOOGLE_MAP_TOKEN, MAPBOX_TOKEN } = env

type Props = {
  sensors: Array<Sensor>,
  showItemDetail: Function,
}

const Map = ({ sensors, showItemDetail }: Props) => {
  if (GOOGLE_MAP_TOKEN)
    return <GoogleMaps sensors={sensors} showItemDetail={showItemDetail} />
  if (MAPBOX_TOKEN)
    return <MapboxMaps sensors={sensors} showItemDetail={showItemDetail} />
  return null
}

export default Map

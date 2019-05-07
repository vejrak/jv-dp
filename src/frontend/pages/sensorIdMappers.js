// @flow

import React from 'react'
import Page from '../src/layout/Page'
import SensorIdMappers from '../src/sensorIdMapper'

const SensorIdMappersPage = () => (
  <Page>
    <div className="container">
      <SensorIdMappers />
    </div>
  </Page>
)

export default SensorIdMappersPage

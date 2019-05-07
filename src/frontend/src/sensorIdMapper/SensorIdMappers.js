// @flow

import React from 'react'
import SensorIdMappersList from './SensorIdMappersListConnected'
import SensorIdMapperForm from './form/SensorIdMapperFormConnected'

const SensorIdMappers = () => (
  <div>
    <div className="shadow-lg p-3 mb-3 bg-white rounded mt-3">
      <h2>Create new sensorIdMapper</h2>
      <SensorIdMapperForm />
    </div>
    <div className="shadow-lg p-3 mb-3 bg-white rounded">
      <h2>SensorIdMappers</h2>
      <SensorIdMappersList />
    </div>
  </div>
)

export default SensorIdMappers

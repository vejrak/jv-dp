// @flow

import React from 'react'
import SensorsList from './SensorsListConnected'
import SensorForm from './form/SensorFormConnected'

const Sensors = () => (
  <div>
    <div className="shadow-lg p-3 mb-3 bg-white rounded mt-3">
      <h2>Create new sensor</h2>
      <SensorForm />
    </div>
    <div className="shadow-lg p-3 mb-3 bg-white rounded">
      <h2>Sensors</h2>
      <SensorsList />
    </div>
  </div>
)

export default Sensors

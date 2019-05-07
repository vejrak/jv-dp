import React from 'react'
import renderer from 'react-test-renderer'
import SensorDetail from '../../src/data/sensorDetail/SensorDetail'

const mockProps = {
  dataCollection: [
    {
      sensor_id: 'id1',
      metric: 'id1',
      unit: 'cm',
      value: 10,
      createdAt: '29.9.2018 10:00',
    },
  ],
  statusData: [
    {
      sensor_id: 'id1',
      is_status: true,
      value: 10,
      createdAt: '29.9.2018 10:00',
    },
  ],
  getSensorDataMetrics: () => {},
  metrics: [],
  sensorId: 'id1',
  getData: () => {},
  getStatusData: () => {},
  backToList: () => {},
  isFetching: false,
  isFetchingData: false,
  error: null,
  errorData: null,
}

it('renders correctly', () => {
  const tree = renderer.create(<SensorDetail {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

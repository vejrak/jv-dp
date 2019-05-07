import React from 'react'
import renderer from 'react-test-renderer'
import SensorIdMappersList from '../../src/sensorIdMapper/SensorIdMappersList'

const mockProps = {
  deleteSensorIdMapper: () => {},
  editSensorIdMapper: () => {},
  getSensorIdMappers: () => {},
  isFetching: false,
  error: null,
  sensorIdMappers: [
    { _id: 'id1', content_type: 'json', source_name: 'key.value' },
  ],
}

it('renders correctly', () => {
  const tree = renderer.create(<SensorIdMappersList {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

import React from 'react'
import renderer from 'react-test-renderer'
import SensorsList from '../../src/sensor/SensorsList'

const mockProps = {
  deleteSensor: () => {},
  editSensor: () => {},
  getSensors: () => {},
  getGroups: () => {},
  isFetching: false,
  error: null,
  sensors: [{ _id: 'id1', identificator: 'id1', description: 'test' }],
}

it('renders correctly', () => {
  const tree = renderer.create(<SensorsList {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

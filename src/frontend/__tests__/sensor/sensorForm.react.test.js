import React from 'react'
import renderer from 'react-test-renderer'
import SensorForm from '../../src/sensor/form/SensorForm'

const mockProps = {
  isFetching: false,
  datasource: 'json',
  error: null,
  createSensor: () => {},
  getSensors: () => {},
}
const mockSensor = { identificator: 'id1', description: 'text' }

it('renders correctly', () => {
  const tree = renderer.create(<SensorForm {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly with data', () => {
  const tree = renderer
    .create(<SensorForm sensor={mockSensor} {...mockProps} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

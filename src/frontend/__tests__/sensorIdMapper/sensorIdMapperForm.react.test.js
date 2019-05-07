import React from 'react'
import renderer from 'react-test-renderer'
import SensorIdMapperForm from '../../src/sensorIdMapper/form/SensorIdMapperForm'

const mockProps = {
  isFetching: false,
  error: null,
  contentType: { TEXT: 'text', JSON: 'json' },
  createSensorIdMapper: () => {},
  getSensorIdMappers: () => {},
  updateSensorIdMapper: () => {},
}

const mockSensorIdMapper = { source_name: 'key.value', content_type: 'json' }
it('renders correctly', () => {
  const tree = renderer.create(<SensorIdMapperForm {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly with data', () => {
  const tree = renderer
    .create(
      <SensorIdMapperForm sensorIdMapper={mockSensorIdMapper} {...mockProps} />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

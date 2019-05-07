import React from 'react'
import renderer from 'react-test-renderer'
import Graph from '../../src/data/sensorDetail/Graph'

const mockProps = {
  data: [
    {
      sensor_id: 'id1',
      metric: 'id1',
      unit: 'cm',
      value: 10,
      createdAt: '29.9.2018 10:00',
    },
  ],
}

it('renders correctly', () => {
  const tree = renderer.create(<Graph {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

import React from 'react'
import renderer from 'react-test-renderer'
import MetricForm from '../../src/metric/form/MetricForm'

const mockProps = {
  isFetching: false,
  error: null,
  createMetric: () => {},
  getMetrics: () => {},
  updateMetric: () => {},
}

it('renders correctly', () => {
  const tree = renderer.create(<MetricForm {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly with data', () => {
  const tree = renderer
    .create(<MetricForm name="name1" {...mockProps} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

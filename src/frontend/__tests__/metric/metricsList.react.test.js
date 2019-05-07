import React from 'react'
import renderer from 'react-test-renderer'
import MetricsList from '../../src/metric/MetricsList'

const mockProps = {
  deleteMetric: () => {},
  editMetric: () => {},
  getMetrics: () => {},
  isFetching: false,
  error: null,
  metrics: [{ _id: 'id1', name: 'name1', units: [] }],
}

it('renders correctly', () => {
  const tree = renderer.create(<MetricsList {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

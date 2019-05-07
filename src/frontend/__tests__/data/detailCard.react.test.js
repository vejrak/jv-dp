import React from 'react'
import renderer from 'react-test-renderer'
import DetailCard from '../../src/data/measureOverview/DetailCard'

const mockProps = {
  overview: { unit: 'cm', min: 0, max: 10, mean: 5 },
  sensor: { identificator: 'id1', description: 'text' },
  showDetail: () => {},
  isFetching: false,
  error: null,
}

it('renders correctly', () => {
  const tree = renderer.create(<DetailCard {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

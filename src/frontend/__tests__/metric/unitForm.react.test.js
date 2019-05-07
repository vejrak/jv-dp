import React from 'react'
import renderer from 'react-test-renderer'
import UnitForm from '../../src/metric/form/UnitForm'

const mockProps = {
  removeUnit: () => {},
  editUnit: () => {},
  index: 1,
  canBeAnchor: false,
  name: 'cm',
  anchor: false,
  to_anchor: 0.1,
}

it('renders correctly', () => {
  const tree = renderer.create(<UnitForm {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

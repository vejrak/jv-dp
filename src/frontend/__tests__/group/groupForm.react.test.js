import React from 'react'
import renderer from 'react-test-renderer'
import GroupForm from '../../src/group/form/GroupForm'

const mockProps = {
  isFetching: false,
  error: null,
  createGroup: () => {},
  getGroups: () => {},
  updateGroup: () => {},
}

it('renders correctly', () => {
  const tree = renderer.create(<GroupForm {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly with data', () => {
  const tree = renderer
    .create(<GroupForm name="name1" {...mockProps} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

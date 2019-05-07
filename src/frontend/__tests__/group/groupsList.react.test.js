import React from 'react'
import renderer from 'react-test-renderer'
import GroupsList from '../../src/group/GroupsList'

const mockProps = {
  deleteGroup: () => {},
  editGroup: () => {},
  getGroups: () => {},
  isFetching: false,
  error: null,
  groups: [{ _id: 'id1', name: 'name1' }],
}

it('renders correctly', () => {
  const tree = renderer.create(<GroupsList {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

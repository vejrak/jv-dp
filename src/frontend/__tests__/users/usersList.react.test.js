import React from 'react'
import renderer from 'react-test-renderer'
import UsersList from '../../src/users/UsersList'

const mockProps = {
  getUsers: () => {},
  deleteUser: () => {},
  isFetching: false,
  error: null,
  users: [{ _id: 'id1', username: 'name1', rank: 1 }],
}

it('renders correctly', () => {
  const tree = renderer.create(<UsersList {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

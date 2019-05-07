import React from 'react'
import renderer from 'react-test-renderer'
import UsersForm from '../../src/users/UsersForm'

const mockProps = {
  isFetching: false,
  error: null,
  roles: { SUPER_ADMIN: 1, ADMIN: 2, USER: 3 },
  user: null,
  createUser: () => {},
  getUsers: () => {},
  getGroups: () => {},
}

it('renders correctly', () => {
  const tree = renderer.create(<UsersForm {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

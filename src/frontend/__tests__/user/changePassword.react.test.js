import React from 'react'
import renderer from 'react-test-renderer'
import ChangePassword from '../../src/user/changePassword/ChangePassword'

const mockProps = {
  changePassword: () => {},
  isFetching: false,
  error: null,
  success: false,
}

it('renders correctly', () => {
  const tree = renderer.create(<ChangePassword {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

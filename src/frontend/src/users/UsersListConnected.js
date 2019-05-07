// @flow

import { connect } from 'react-redux'
import { getUsers, deleteUser } from './actions'
import UsersList from './UsersList'

export default connect(
  ({ users: { usersList } }) => ({
    isFetching: usersList.isFetching,
    error: usersList.error,
    users: usersList.users,
  }),
  { getUsers, deleteUser },
)(UsersList)

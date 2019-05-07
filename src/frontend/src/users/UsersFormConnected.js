// @flow

import { connect } from 'react-redux'
import UsersForm from './UsersForm'
import { createUser } from './actions'
import { getGroups } from '../group/actions'

export default connect(
  ({ users: { userForm }, consts, group: { groupList } }) => ({
    isFetching: userForm.isFetching,
    user: userForm.user,
    error: userForm.error,
    roles: consts.roles,
    groups: groupList.groups,
  }),
  { createUser, getGroups },
)(UsersForm)

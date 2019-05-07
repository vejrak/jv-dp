// @flow

import { connect } from 'react-redux'
import GroupForm from './GroupForm'
import { createGroup, getGroups } from '../actions'

export default connect(
  ({ group: { groupForm } }) => ({
    isFetching: groupForm.isFetching,
    error: groupForm.error,
  }),
  { createGroup, getGroups },
)(GroupForm)

// @flow

import { connect } from 'react-redux'
import GroupsList from './GroupsList'
import { deleteGroup, editGroup, getGroups } from './actions'

export default connect(
  ({ group: { groupList } }) => ({
    isFetching: groupList.isFetching,
    error: groupList.error,
    groups: groupList.groups,
  }),
  { deleteGroup, editGroup, getGroups },
)(GroupsList)

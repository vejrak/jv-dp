// @flow

import { connect } from 'react-redux'
import ChangePassword from './ChangePassword'
import { changePassword } from '../actions'

export default connect(
  ({ user: { changePassword } }) => ({
    isFetching: changePassword.isFetching,
    error: changePassword.error,
    success: changePassword.success,
  }),
  { changePassword },
)(ChangePassword)

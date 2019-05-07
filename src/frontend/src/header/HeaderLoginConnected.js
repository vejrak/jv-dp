// @flow

import { connect } from 'react-redux'
import HeaderLogin from './HeaderLogin'
import { logout } from '../user/actions'

export default connect(
  ({ user: { user } }) => ({
    isLoggedIn: user.isLoggedIn,
    username: user.username,
  }),
  { logout },
)(HeaderLogin)

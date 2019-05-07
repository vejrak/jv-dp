// @flow

import { connect } from 'react-redux'
import { login } from '../actions'
import Login from './Login'

export default connect(
  ({ user: { user } }) => ({ error: user.error, isFetching: user.isFetching }),
  { login },
)(Login)

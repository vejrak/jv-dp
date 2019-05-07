// @flow

import { connect } from 'react-redux'
import HeaderLinks from './HeaderLinks'

export default connect(({ user: { user } }) => ({
  isLoggedIn: user.isLoggedIn,
  rank: user.rank,
}))(HeaderLinks)

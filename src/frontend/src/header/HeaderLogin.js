// @flow

import React from 'react'
import Link from 'next/link'
import { logout } from '../user/actions'

type Props = $ReadOnly<{|
  isLoggedIn: boolean,
  logout: typeof logout,
  username: string,
|}>

class HeaderLogin extends React.PureComponent<Props> {
  handleLogout = () => {
    this.props.logout()
  }

  render() {
    const { isLoggedIn, username } = this.props

    return (
      <>
        {isLoggedIn && (
          <>
            <li className="nav-item">
              <span className="nav-link">Logged as {username}</span>
            </li>
            <li className="nav-item">
              <Link href="/changePassword">
                <a className="nav-link" href="#">
                  Change password
                </a>
              </Link>
            </li>
          </>
        )}
        <li className="nav-item">
          {isLoggedIn ? (
            <a className="nav-link" href="#" onClick={this.handleLogout}>
              Logout
            </a>
          ) : (
            <Link href="/login">
              <a className="nav-link">Login</a>
            </Link>
          )}
        </li>
      </>
    )
  }
}

export default HeaderLogin

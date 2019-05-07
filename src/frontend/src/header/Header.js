// @flow

import React from 'react'
import HeaderLoginConnected from './HeaderLoginConnected'
import HeaderLinksConnected from './HeaderLinksConnected'

const Header = () => (
  <div className="row">
    <ul className="nav nav-tabs col-md-6 nav-fill">
      <HeaderLinksConnected />
    </ul>
    <ul className="nav nav-tabs col-md-6 justify-content-end">
      <HeaderLoginConnected />
    </ul>
  </div>
)

export default Header

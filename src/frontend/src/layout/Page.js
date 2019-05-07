// @flow

import * as React from 'react'
import Header from '../header'

type Props = $ReadOnly<{|
  children?: React.Node,
|}>

const Page = ({ children }: Props) => (
  <div className="wrapper">
    <Header />
    <div className="container">{children}</div>
    <style jsx>{`
      .wrapper {
        height: 100vh;
        overflow: auto;
      }
    `}</style>
  </div>
)

export default Page

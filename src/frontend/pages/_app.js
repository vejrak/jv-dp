import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import initStore from '../src/redux'
import {
  setServerCookies,
  isAuthenticationCookieValid,
  getAuthenticationUsername,
  getAuthenticationRank,
} from '../src/helpers/authentication'
import { authenticate, hydrateUser } from '../src/user/actions'
import { getConsts } from '../src/consts/actions'

import '../src/libs/bootstrap/css/bootstrap.min.css'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (ctx.req && ctx.req.headers) setServerCookies(ctx.req.headers.cookie)
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  constructor(props) {
    if (isAuthenticationCookieValid()) {
      props.store.dispatch(
        hydrateUser(getAuthenticationUsername(), getAuthenticationRank()),
      )
    }
    super()
  }

  componentDidMount() {
    if (isAuthenticationCookieValid()) {
      this.props.store.dispatch(authenticate())
    }
    this.props.store.dispatch(getConsts())
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(initStore)(MyApp)

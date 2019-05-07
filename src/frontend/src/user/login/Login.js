// @flow

import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { login } from '../actions'
import type { ErrorResponse } from '../../types'
import Spinner from '../../components/Spinner'
import * as validation from '../../helpers/validation'
import Input from '../../components/Input'
import { isFormValid } from '../../helpers'

type Props = $ReadOnly<{|
  login: typeof login,
  isFetching: boolean,
  error: ?ErrorResponse,
|}>

type State = {
  formData: {
    username: string,
    password: string,
  },
  validationResults: validation.ValidationResults<*>,
}

class Login extends Component<Props, State> {
  state = {
    formData: {
      username: '',
      password: '',
    },
    validationResults: {},
  }

  validate = () => {
    const { formData } = this.state
    return {
      username: validation.required(formData.username),
      password: validation.required(formData.password),
    }
  }

  handleChange = (value: Object) => {
    const { formData, validationResults } = this.state
    delete validationResults[Object.keys(value)[0]]
    this.setState({
      formData: { ...formData, ...value },
      validationResults,
    })
  }

  handleClick = () => {
    const { formData } = this.state
    const validationResults = this.validate()
    this.setState({ validationResults })
    if (isFormValid(validationResults)) {
      this.props.login({ ...formData })
    }
  }

  render() {
    const { formData, validationResults } = this.state
    const { isFetching, error } = this.props

    if (isFetching) return <Spinner />

    return (
      <div className="form-group">
        {error && (
          <div className="alert alert-danger" role="alert">
            Wrong username or password
          </div>
        )}
        <label htmlFor="username">Username</label>
        <Input
          className="form-control"
          id="username"
          name="username"
          onChange={({ target }) =>
            this.handleChange({ username: target.value })
          }
          validationError={validationResults.username}
          value={formData.username}
        />
        <label className="mt-2" htmlFor="password">
          Password
        </label>
        <Input
          className="form-control"
          name="password"
          onChange={({ target }) =>
            this.handleChange({ password: target.value })
          }
          type="password"
          validationError={validationResults.password}
          value={formData.password}
        />
        <Button className="mt-4" onClick={this.handleClick}>
          Login
        </Button>
      </div>
    )
  }
}

export default Login

// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import type { ErrorResponse } from '../../types'
import { changePassword } from '../actions'
import Spinner from '../../components/Spinner'
import * as validation from '../../helpers/validation'
import Input from '../../components/Input'
import { isFormValid } from '../../helpers'

type Props = $ReadOnly<{|
  changePassword: typeof changePassword,
  isFetching: boolean,
  error: ?ErrorResponse,
  success: boolean,
|}>

type State = {
  formData: {
    password: string,
    password_confirm: string,
    password_new: string,
  },
  validationResults: validation.ValidationResults<*>,
}

class UsersForm extends React.PureComponent<Props, State> {
  state = {
    formData: { password: '', password_confirm: '', password_new: '' },
    validationResults: {},
  }

  validate = () => {
    const { formData } = this.state
    return {
      password: validation.required(formData.password),
      password_confirm: validation.required(formData.password_confirm),
      password_new: validation.required(formData.password_new),
    }
  }

  handleChange = (value: Object): void => {
    const { formData, validationResults } = this.state
    delete validationResults[Object.keys(value)[0]]
    this.setState({
      formData: { ...formData, ...value },
      validationResults,
    })
  }

  resetState = (): void => {
    this.setState({
      formData: { password: '', password_confirm: '', password_new: '' },
      validationResults: {},
    })
  }

  handleClick = async () => {
    const { formData } = this.state
    const validationResults = this.validate()
    this.setState({ validationResults })
    if (isFormValid(validationResults)) {
      await this.props.changePassword({ ...formData })
      this.resetState()
    }
  }

  render() {
    const { isFetching, error, success } = this.props
    const { formData, validationResults } = this.state

    if (isFetching) return <Spinner />

    return (
      <div className="form-group p-3">
        {success && (
          <div className="alert alert-success" role="alert">
            Password changed !
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error.errmsg}
          </div>
        )}
        <label className="mt-2" htmlFor="password">
          Password
        </label>
        <Input
          className="form-control"
          id="password"
          name="password"
          onChange={({ target }) =>
            this.handleChange({ password: target.value })
          }
          type="password"
          validationError={validationResults.password}
          value={formData.password}
        />
        <label className="mt-2" htmlFor="password_confirm">
          New password
        </label>
        <Input
          className="form-control"
          id="password_confirm"
          name="password_confirm"
          onChange={({ target }) =>
            this.handleChange({ password_confirm: target.value })
          }
          type="password"
          validationError={validationResults.password_confirm}
          value={formData.password_confirm}
        />
        <label className="mt-2" htmlFor="password_new">
          New password confirmation
        </label>
        <Input
          className="form-control"
          id="password_new"
          name="password_new"
          onChange={({ target }) =>
            this.handleChange({ password_new: target.value })
          }
          type="password"
          validationError={validationResults.password_new}
          value={formData.password_new}
        />
        <Button
          className="mt-3 btn btn-success d-block"
          disabled={isFetching}
          onClick={this.handleClick}
        >
          Change
        </Button>
      </div>
    )
  }
}

export default UsersForm

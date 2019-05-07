// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import type { ErrorResponse } from '../../types'
import { createGroup, getGroups } from '../actions'
import Spinner from '../../components/Spinner'
import * as validation from '../../helpers/validation'
import Input from '../../components/Input'
import { isFormValid } from '../../helpers'

type Props = $ReadOnly<{|
  isFetching: boolean,
  error: ?ErrorResponse,
  createGroup: typeof createGroup,
  getGroups: typeof getGroups,
  updateGroup: Function,
  name?: string,
|}>

type State = {
  formData: { name: string },
  validationResults: validation.ValidationResults<*>,
}

class GroupForm extends React.PureComponent<Props, State> {
  state = {
    formData: { name: this.props.name || '' },
    validationResults: {},
  }

  validate = () => {
    const { formData } = this.state
    return {
      name: validation.required(formData.name),
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
    this.setState({ formData: { name: '' }, validationResults: {} })
  }

  handleClick = async () => {
    const { formData } = this.state
    const validationResults = this.validate()
    this.setState({ validationResults })
    if (isFormValid(validationResults)) {
      if (this.props.updateGroup) {
        await this.props.updateGroup({
          ...formData,
        })
      } else {
        await this.props.createGroup({
          ...formData,
        })
        this.resetState()
      }
      await this.props.getGroups()
    }
  }

  render() {
    const { formData, validationResults } = this.state

    const { error, isFetching } = this.props
    if (isFetching) return <Spinner />
    return (
      <div className="form-group mt-3">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error.errmsg}
          </div>
        )}
        <label class-name="mt-2" htmlFor="name">
          Name
        </label>
        <Input
          className="form-control mb-1"
          id="name"
          name="name"
          onChange={({ target }) => this.handleChange({ name: target.value })}
          validationError={validationResults.name}
          value={formData.name}
        />
        <small className="form-text text-muted" id="nameHelp">
          Name of group
        </small>
        <Button
          className="mt-3 btn btn-success d-block"
          onClick={this.handleClick}
        >
          Save
        </Button>
      </div>
    )
  }
}

export default GroupForm

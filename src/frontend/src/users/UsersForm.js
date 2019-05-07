// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import Select from 'react-select'
import type { ErrorResponse, Group, User } from '../types'
import { createUser } from './actions'
import { getApprovedRoles } from './helpers'
import Spinner from '../components/Spinner'
import * as validation from '../helpers/validation'
import Input from '../components/Input'
import { isFormValid, createGroupsOptions } from '../helpers'
import { getGroups } from '../group/actions'

type Props = $ReadOnly<{|
  createUser: typeof createUser,
  isFetching: boolean,
  user: ?User,
  roles: Object,
  groups: Array<Group>,
  getGroups: typeof getGroups,
  error: ?ErrorResponse,
|}>

type State = {
  formData: {
    username: string,
    password: string,
    rank: number,
    groups: Array<Object>,
  },
  validationResults: validation.ValidationResults<*>,
}

class UsersForm extends React.PureComponent<Props, State> {
  state = {
    formData: { username: '', password: '', rank: 3, groups: [] },
    validationResults: {},
  }

  componentDidMount() {
    this.props.getGroups()
  }

  validate = () => {
    const { formData } = this.state
    return {
      username: validation.required(formData.username),
      password: validation.required(formData.password),
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
      formData: { username: '', password: '', rank: 3, groups: [] },
      validationResults: {},
    })
  }

  handleClick = async () => {
    const { formData } = this.state
    const validationResults = this.validate()
    this.setState({ validationResults })
    if (isFormValid(validationResults)) {
      await this.props.createUser({
        ...formData,
        groups: formData.groups.map((value) => value.value),
      })
      this.resetState()
    }
  }

  render() {
    const { isFetching, error, groups, roles, user } = this.props
    const { formData, validationResults } = this.state
    const options = createGroupsOptions(groups)

    if (isFetching) return <Spinner />

    const approvedRoles = getApprovedRoles(1, roles)

    return (
      <div className="form-group p-3">
        {user && (
          <div className="alert alert-success" role="alert">
            User {user.username} created !
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error.errmsg}
          </div>
        )}
        <label className="mt-2" htmlFor="username">
          Username
        </label>
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
          id="password"
          name="password"
          onChange={({ target }) =>
            this.handleChange({ password: target.value })
          }
          type="password"
          validationError={validationResults.password}
          value={formData.password}
        />
        <label className="mt-2" htmlFor="sel1">
          Roles
        </label>
        <select
          className="form-control"
          id="sel1"
          onChange={({ target }) =>
            this.handleChange({ rank: parseInt(target.value, 10) })
          }
          value={formData.rank}
        >
          {Object.keys(approvedRoles).map((index) => (
            <option key={approvedRoles[index]} value={approvedRoles[index]}>
              {index}
            </option>
          ))}
        </select>
        <label className="mt-2" htmlFor="groups">
          Groups
        </label>
        <Select
          className="mt-2"
          id="groups"
          isMulti
          onChange={(value) => this.handleChange({ groups: value })}
          options={options}
          value={formData.groups}
        />
        <Button
          className="mt-3 btn btn-success d-block"
          disabled={isFetching}
          onClick={this.handleClick}
        >
          Create
        </Button>
      </div>
    )
  }
}

export default UsersForm

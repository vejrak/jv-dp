// @flow

import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import type { ErrorResponse, User } from '../types'
import { getUsers, deleteUser } from './actions'
import Spinner from '../components/Spinner'

type Props = $ReadOnly<{|
  isFetching: boolean,
  users: Array<User>,
  getUsers: typeof getUsers,
  error: ?ErrorResponse,
  deleteUser: typeof deleteUser,
|}>

class UsersList extends Component<Props> {
  componentDidMount() {
    this.props.getUsers()
  }

  handleUserDelete = async (_id: string) => {
    await this.props.deleteUser(_id)
  }

  render() {
    const { error, users, isFetching } = this.props
    if (isFetching) return <Spinner />

    if (error)
      return (
        <div className="alert alert-danger" role="alert">
          {error.errmsg}
        </div>
      )

    return (
      <div>
        {users.length > 0 && (
          <table className="table">
            <tbody>
              <tr>
                <th>Username</th>
                <th>Rank</th>
                <th />
              </tr>
            </tbody>
            {users.map((value) => (
              <tbody key={value._id}>
                <tr>
                  <td className="col">{value.username}</td>
                  <td className="col">{value.rank}</td>
                  <td className="col">
                    <Button
                      className="btn d-block btn-danger"
                      disabled={isFetching}
                      onClick={() => {
                        if (
                          window.confirm(
                            'Are you sure you wish to delete this item?',
                          )
                        )
                          this.handleUserDelete(value._id)
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        )}
      </div>
    )
  }
}

export default UsersList

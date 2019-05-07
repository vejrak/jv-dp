// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import filter from 'lodash/filter'
import { deleteGroup, editGroup, getGroups } from './actions'
import { canShowUpdateForm } from '../helpers'
import GroupForm from './form/GroupFormConnected'
import type { ErrorResponse, Group } from '../types'
import Spinner from '../components/Spinner'

type Props = $ReadOnly<{|
  deleteGroup: typeof deleteGroup,
  editGroup: typeof editGroup,
  getGroups: typeof getGroups,
  isFetching: boolean,
  error: ?ErrorResponse,
  groups: Array<Group>,
|}>

type State = {
  showEditFormsFor: Array<string>,
}

class GroupsList extends React.PureComponent<Props, State> {
  state = {
    showEditFormsFor: [],
  }

  componentDidMount() {
    this.props.getGroups()
  }

  handleEditClick = (_id: string): void => {
    const { showEditFormsFor } = this.state
    this.setState({ showEditFormsFor: showEditFormsFor.concat(_id) })
  }

  handleHideClick = (_id: string): void => {
    const { showEditFormsFor } = this.state
    this.setState({
      showEditFormsFor: filter(showEditFormsFor, _id),
    })
  }

  updateGroup = (_id: string): Function => (group: Group): void => {
    this.props.editGroup(group, _id)
  }

  handleDeleteClick = async (_id: string) => {
    await this.props.deleteGroup(_id)
  }

  render() {
    const { showEditFormsFor } = this.state
    const { error, isFetching, groups } = this.props

    if (isFetching) return <Spinner />

    if (error)
      return (
        <div className="alert alert-danger" role="alert">
          {error.errmsg}
        </div>
      )

    if (!groups || groups.length === 0) return null
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th />
            <th />
          </tr>
        </thead>
        {groups.map((group) => (
          <tbody key={group._id} className="mb-4">
            <tr>
              <td>{group.name}</td>
              <td>
                <Button
                  className="mt-3 mb-3 btn d-block btn-danger"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you wish to delete this item?',
                      )
                    )
                      this.handleDeleteClick(group._id)
                  }}
                >
                  Delete
                </Button>
              </td>
              {!canShowUpdateForm(showEditFormsFor, group._id) && (
                <td>
                  <Button
                    className="mt-3 mb-3"
                    onClick={() => this.handleEditClick(group._id)}
                  >
                    Edit
                  </Button>
                </td>
              )}
            </tr>
            {canShowUpdateForm(showEditFormsFor, group._id) && (
              <>
                <tr>
                  <td colSpan="2">
                    <GroupForm
                      name={group.name}
                      updateGroup={this.updateGroup(group._id)}
                    />
                  </td>
                  <td>
                    <Button
                      className="mt-3 mb-3"
                      onClick={() => this.handleHideClick(group._id)}
                    >
                      Hide
                    </Button>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        ))}
      </table>
    )
  }
}

export default GroupsList

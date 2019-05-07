// @flow

import React from 'react'
import GroupsList from './GroupsListConnected'
import GroupForm from './form/GroupFormConnected'

const Groups = () => (
  <div>
    <div className="shadow-lg p-3 mb-3 bg-white rounded mt-3">
      <h2>Create new group</h2>
      <GroupForm />
    </div>
    <div className="shadow-lg p-3 mb-3 bg-white rounded">
      <h2>Groups</h2>
      <GroupsList />
    </div>
  </div>
)

export default Groups

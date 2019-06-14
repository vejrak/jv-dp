// @flow

import React from 'react'
import type { Data } from '../../types'

type Props = {
  statusData: Array<Data>,
}

const StatusList = ({ statusData }: Props) => {
  if (!statusData.length) return null

  return (
    <div className="mt-5 col-12">
      <h3 className="pt-1 pb-1">Last 10 status sent by sensor</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Code</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
          {statusData.slice(-5).map((item) => (
            <tr>
              <th scope="row">{item._id}</th>
              <td>{item.value}</td>
              <td>{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StatusList

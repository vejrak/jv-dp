// @flow

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import type { Data } from '../../types'

type Props = $ReadOnly<{|
  data: Array<Data>,
|}>

const Graph = ({ data }: Props) => {
  if (data.length === 0) return <div className="col-12 mb-2 mt-3">No data</div>
  return (
    <LineChart
      data={data}
      height={300}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      width={1000}
    >
      <XAxis dataKey="createdAt" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip isAnimationActive={data.length < 3000} />
      <Legend />
      <Line
        dataKey="value"
        dot={data.length < 3000}
        isAnimationActive={data.length < 3000}
        stroke="#82ca9d"
        type="monotone"
      />
    </LineChart>
  )
}

export default Graph

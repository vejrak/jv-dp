// @flow

import React from 'react'
import BasicMapper from './BasicMapper'
import BinaryMixedMapper from './BinaryMixedMapper'
import BinaryMapper from './BinaryMapper'

import type {
  BasicMapper as BasicMapperType,
  Datasource,
  Metric,
} from '../../types'
import { getMetrics } from '../../metric/actions'
import Spinner from '../../components/Spinner'

type Props = $ReadOnly<{|
  datasource: Datasource,
  getMetrics: typeof getMetrics,
  datasource_type: string,
  removeMapper: Function,
  editMapper: Function,
  isFetching: boolean,
  mapper: Array<BasicMapperType>,
  metrics: Array<Metric>,
|}>

class Mapper extends React.PureComponent<Props> {
  keyGenerator = 0

  componentDidMount() {
    this.props.getMetrics()
  }

  render() {
    const {
      datasource,
      datasource_type,
      removeMapper,
      isFetching,
      editMapper,
      mapper,
      metrics,
    } = this.props
    if (isFetching) return <Spinner />
    if (
      datasource_type === datasource.JSON ||
      datasource_type === datasource.TEXT
    ) {
      return (
        <>
          {mapper.map((value, index) => (
            <BasicMapper
              key={(this.keyGenerator += 1)}
              index={index}
              {...value}
              editMapper={editMapper(index)}
              metrics={metrics}
              removeMapper={removeMapper(index)}
            />
          ))}
        </>
      )
    }
    if (datasource_type === datasource.JSON_BINARY) {
      return (
        <>
          {mapper.map((value, index) => (
            <BinaryMixedMapper
              key={(this.keyGenerator += 1)}
              index={index}
              {...value}
              editMapper={editMapper(index)}
              metrics={metrics}
              removeMapper={removeMapper(index)}
            />
          ))}
        </>
      )
    }
    if (datasource_type === datasource.BINARY) {
      return (
        <>
          {mapper.map((value, index) => (
            <BinaryMapper
              key={(this.keyGenerator += 1)}
              index={index}
              {...value}
              editMapper={editMapper(index)}
              metrics={metrics}
              removeMapper={removeMapper(index)}
            />
          ))}
        </>
      )
    }
    return null
  }
}

export default Mapper

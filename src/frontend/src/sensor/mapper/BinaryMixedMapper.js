// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import type { Metric, BinaryMapper as BinaryMapperType } from '../../types'
import { addNewBinaryMapper } from '../form/helpers'
import BinaryMapper from './BinaryMapper'

type Props = $ReadOnly<{
  index: number,
  source_name?: string,
  binaryMappers?: Array<BinaryMapperType>,
  removeMapper: Function,
  editMapper: Function,
  metrics: Array<Metric>,
}>

type State = {
  source_name: string,
  binaryMappers: Array<BinaryMapperType>,
}

class BinaryMixedMapper extends React.PureComponent<Props, State> {
  keyGenerator = 0

  state = {
    source_name: this.props.source_name || '',
    binaryMappers: this.props.binaryMappers || [],
  }

  handleRemoveBinaryMapper = (index: number): Function => (): void => {
    const { binaryMappers } = this.state
    this.setState({
      binaryMappers: binaryMappers.filter((_, i) => i !== index),
    })
  }

  handleAddBinaryMapper = (): void => {
    const { binaryMappers } = this.state
    this.setState({ binaryMappers: addNewBinaryMapper(binaryMappers) })
  }

  handleEditMapper = (index: number): Function => (
    binaryMapper: BinaryMapperType,
  ): void => {
    const { binaryMappers } = this.state
    binaryMappers[index] = binaryMapper
    this.handleChange({ binaryMappers })
  }

  handleChange = (value: Object) => {
    this.setState({ ...value }, () => this.props.editMapper({ ...this.state }))
  }

  render() {
    const { index, metrics, removeMapper } = this.props
    const { source_name, binaryMappers } = this.state

    return (
      <div>
        <h3>{`Mapper ${index + 1}`}</h3>
        <label htmlFor={`source_name${index}`}>Source Path</label>
        <input
          className="form-control mt-2"
          index={`source_name${index}`}
          name={`source_name${index}`}
          onChange={({ target }) =>
            this.handleChange({ source_name: target.value })
          }
          type="text"
          value={source_name}
        />
        <small className="form-text text-muted mb-3" id="sourceNameHelp">
          Path to value in JSON document or text Example for receive value in
          JSON:
          <br />
          {'key.value => {key: value}'}
        </small>

        {binaryMappers.map((value, key) => (
          <BinaryMapper
            key={(this.keyGenerator += 1)}
            index={key}
            metrics={metrics}
            {...value}
            editMapper={this.handleEditMapper(key)}
            removeMapper={this.handleRemoveBinaryMapper(key)}
          />
        ))}
        <Button
          className="mt-3 btn btn-primary"
          onClick={this.handleAddBinaryMapper}
        >
          Add new binary mapper
        </Button>
        <Button className="mt-3 d-block btn btn-danger" onClick={removeMapper}>
          Remove mixed mapper
        </Button>
      </div>
    )
  }
}

export default BinaryMixedMapper

// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import isEqual from 'lodash/isEqual'
import getErrorMessage from '../../helpers/validationErrors'
import { addNewUnit, canBeAnchor, immutableEditUnit } from './helpers'
import type { ErrorResponse, Unit } from '../../types'
import { createMetric } from '../actions'
import UnitForm from './UnitForm'
import Spinner from '../../components/Spinner'
import * as validation from '../../helpers/validation'
import Input from '../../components/Input'
import { isFormValid } from '../../helpers'

type State = {
  formData: {
    name: string,
    units: Array<Unit>,
  },
  validationResults: validation.ValidationResults<*>,
}

type Props = $ReadOnly<{|
  name?: string,
  error: ?ErrorResponse,
  units?: Array<Unit>,
  updateMetric?: Function,
  createMetric: typeof createMetric,
  isFetching: boolean,
|}>

class MetricForm extends React.Component<Props, State> {
  state = {
    formData: {
      name: this.props.name || '',
      units: this.props.units || [],
    },
    validationResults: {},
  }

  unitIndexer: number = 0

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const {
      formData: newFormData,
      validationResults: newValidationResults,
    } = nextState
    const { formData, validationResults } = this.state
    return (
      newFormData.units.length !== formData.units.length ||
      !isEqual(nextProps, this.props) ||
      !isEqual(formData, newFormData) ||
      !isEqual(validationResults, newValidationResults)
    )
  }

  validate = () => {
    const { formData } = this.state
    return {
      name: validation.required(formData.name),
      units: validation.areUnitsValid(formData.units),
    }
  }

  handleChange = (value: Object) => {
    const { formData, validationResults } = this.state
    delete validationResults[Object.keys(value)[0]]
    this.setState({
      formData: { ...formData, ...value },
      validationResults,
    })
  }

  resetState = (): void => {
    this.setState({ formData: { name: '', units: [] }, validationResults: {} })
  }

  handleAddUnit = (): void => {
    const { units } = this.state.formData
    const { formData } = this.state
    this.setState({ formData: { ...formData, units: addNewUnit(units) } })
  }

  handleEditUnit = (index: number): Function => (unit: Unit): void => {
    const { units } = this.state.formData
    const { formData } = this.state
    if (units[index].anchor !== unit.anchor) {
      this.setState({
        formData: {
          ...formData,
          units: immutableEditUnit(units, unit, index),
        },
      })
    } else {
      units[index] = unit
      this.setState({
        formData: { ...formData, units },
      })
    }
  }

  handleRemoveUnit = (index: number): void => {
    const { formData } = this.state
    const { units } = formData
    this.setState({
      formData: {
        ...formData,
        units: units.filter((_, i) => i !== index),
      },
    })
  }

  handleClick = async () => {
    const { createMetric, updateMetric } = this.props
    const { formData } = this.state
    const validationResults = this.validate()
    this.setState({ validationResults })
    if (isFormValid(validationResults)) {
      if (updateMetric) {
        await updateMetric({ ...formData })
      } else {
        this.resetState()
        await createMetric({ ...formData })
      }
    }
  }

  render() {
    const { formData, validationResults } = this.state
    const { isFetching, error } = this.props

    if (isFetching) return <Spinner />
    const unitsValidationMessage = getErrorMessage(validationResults.units)

    return (
      <div className="form-group mt-3">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error.errmsg}
          </div>
        )}
        <label class-name="mt-2" htmlFor="name">
          Metric name
        </label>
        <Input
          className="form-control mb-3"
          id="name"
          name="name"
          onChange={({ target }) => this.handleChange({ name: target.value })}
          validationError={validationResults.name}
          value={formData.name}
        />
        {unitsValidationMessage && (
          <div className="alert alert-danger">{unitsValidationMessage}</div>
        )}
        {formData.units &&
          formData.units.map((value, index) => (
            <UnitForm
              key={(this.unitIndexer += 1)}
              index={this.unitIndexer}
              {...value}
              canBeAnchor={canBeAnchor(formData.units, value)}
              editUnit={this.handleEditUnit(index)}
              removeUnit={() => {
                this.handleRemoveUnit(index)
              }}
            />
          ))}
        <Button className="mt-3 mr-3" onClick={this.handleAddUnit}>
          Add unit
        </Button>
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

export default MetricForm

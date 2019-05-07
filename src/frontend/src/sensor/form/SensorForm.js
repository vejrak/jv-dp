// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import isEqual from 'lodash/isEqual'
import Select from 'react-select'
import {
  addNewBasicMapper,
  addNewBinaryMapper,
  addNewBinaryMixedMapper,
  getMapperObject,
  getMapper,
  removeIndexFromMapper,
} from './helpers'
import type {
  BasicMapper,
  BinaryMixedMapper,
  BinaryMapper,
  Datasource,
  ErrorResponse,
  Group,
  Sensor,
} from '../../types'
import { createSensor } from '../actions'
import Mapper from '../mapper'
import Spinner from '../../components/Spinner'
import * as validation from '../../helpers/validation'
import Input from '../../components/Input'
import {
  isFormValid,
  createGroupsOptions,
  getGroupForSelect,
} from '../../helpers'

type Props = {
  createSensor: typeof createSensor,
  datasource: Datasource,
  error: ?ErrorResponse,
  isFetching: boolean,
  updateSensor?: Function,
  sensor?: Sensor,
  groups: Array<Group>,
}

type State = {
  formData: {
    datasource_type: string,
    description: string,
    lat: number,
    lng: number,
    groups: Array<Object>,
    identificator: string,
    jsonMappers: Array<BasicMapper>,
    textMappers: Array<BasicMapper>,
    binaryMappers: Array<BinaryMapper>,
    separator: string,
    binaryMixedMappers: Array<BinaryMixedMapper>,
  },
  validationResults: validation.ValidationResults<*>,
}

class SensorForm extends React.Component<Props, State> {
  unitIndexer = 0

  constructor(props: Props) {
    super(props)
    const { sensor, groups } = props
    this.state = {
      formData: {
        identificator: (sensor && sensor.identificator) || '',
        description: (sensor && sensor.description) || '',
        lat: (sensor && sensor.lat) || 0,
        lng: (sensor && sensor.lng) || 0,
        groups:
          (sensor &&
            sensor.groups &&
            getGroupForSelect(groups, sensor.groups)) ||
          [],
        datasource_type: (sensor && sensor.datasource_type) || '',
        separator: (sensor && sensor.separator) || '',
        jsonMappers: (sensor && sensor.jsonMappers) || [],
        textMappers: (sensor && sensor.textMappers) || [],
        binaryMappers: (sensor && sensor.binaryMappers) || [],
        binaryMixedMappers: (sensor && sensor.binaryMixedMappers) || [],
      },
      validationResults: {},
    }
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { datasource } = props
    const { formData } = state
    if (Object.keys(datasource).length > 0 && formData.datasource_type === '') {
      return {
        formData: {
          ...formData,
          datasource_type: datasource[Object.keys(datasource)[0]],
        },
      }
    }

    return null
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const {
      formData: newFormData,
      validationResults: newValidationResults,
    } = nextState
    const { formData, validationResults } = this.state
    return (
      !isEqual(nextProps, this.props) ||
      !isEqual(formData, newFormData) ||
      !isEqual(validationResults, newValidationResults)
    )
  }

  validate = () => {
    const { formData } = this.state
    return {
      identificator: validation.required(formData.identificator),
    }
  }

  resetState = (): void => {
    const { datasource } = this.props
    this.setState({
      formData: {
        identificator: '',
        description: '',
        datasource_type: datasource[Object.keys(datasource)[0]],
        separator: '',
        lat: 0,
        lng: 0,
        groups: [],
        jsonMappers: [],
        textMappers: [],
        binaryMappers: [],
        binaryMixedMappers: [],
      },
      validationResults: {},
    })
  }

  handleAddMapper = (): void => {
    const {
      datasource_type,
      binaryMixedMappers,
      binaryMappers,
      jsonMappers,
      textMappers,
    } = this.state.formData
    const { formData } = this.state
    const { datasource } = this.props
    if (datasource_type === datasource.JSON) {
      this.setState({
        formData: { ...formData, jsonMappers: addNewBasicMapper(jsonMappers) },
      })
    } else if (datasource_type === datasource.TEXT) {
      this.setState({
        formData: { ...formData, textMappers: addNewBasicMapper(textMappers) },
      })
    } else if (datasource_type === datasource.BINARY) {
      this.setState({
        formData: {
          ...formData,
          binaryMappers: addNewBinaryMapper(binaryMappers),
        },
      })
    } else if (datasource_type === datasource.JSON_BINARY) {
      this.setState({
        formData: {
          ...formData,
          binaryMixedMappers: addNewBinaryMixedMapper(binaryMixedMappers),
        },
      })
    }
    this.forceUpdate()
  }

  handleRemoveMapper = (index: number): Function => (): void => {
    const { datasource_type } = this.state.formData
    const { formData } = this.state
    const mappers = getMapperObject(datasource_type, this.state.formData)
    if (!mappers) return
    const filtredMappers = removeIndexFromMapper(mappers, index)
    this.setState({
      formData: {
        ...formData,
        ...filtredMappers,
      },
    })
  }

  handleEditMapper = (index: number): Function => (
    mapper: BasicMapper,
  ): void => {
    const { datasource_type } = this.state.formData
    const { formData } = this.state
    const mappers = getMapperObject(datasource_type, this.state.formData)
    if (!mappers) return
    mappers[Object.keys(mappers)[0]][index] = mapper
    this.setState({ formData: { ...formData, ...mappers } })
  }

  resetSeparatorState = (value: Object) => {
    if (value.datasource_type && value.datasource_type !== 'text') {
      return { separator: '' }
    }
    return {}
  }

  handleChange = (value: Object): void => {
    const { formData, validationResults } = this.state
    delete validationResults[Object.keys(value)[0]]
    this.setState({
      formData: {
        ...formData,
        ...value,
        ...this.resetSeparatorState(value),
      },
    })
  }

  handleClick = async () => {
    const { createSensor, updateSensor } = this.props
    const { formData } = this.state
    const validationResults = this.validate()

    this.setState({ validationResults })
    if (isFormValid(validationResults)) {
      if (updateSensor) {
        await updateSensor({
          ...formData,
          groups: formData.groups.map((value) => value.value),
        })
      } else {
        await createSensor({
          ...formData,
          groups: formData.groups.map((value) => value.value),
        })
        if (!this.props.error) this.resetState()
      }
    }
  }

  render() {
    const {
      identificator,
      description,
      lat,
      lng,
      groups,
      datasource_type,
      separator,
    } = this.state.formData
    const { validationResults } = this.state

    const { error, isFetching, datasource } = this.props
    const groupsOptions = createGroupsOptions(this.props.groups)
    const mapper = getMapper(datasource_type, this.state.formData)

    if (isFetching) return <Spinner />

    return (
      <div className="form-group mt-3">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error.errmsg}
          </div>
        )}
        <label class-name="mt-2" htmlFor="identificator">
          Identificator
        </label>
        <Input
          className="form-control mb-1"
          id="identificator"
          name="identificator"
          onChange={({ target }) =>
            this.handleChange({ identificator: target.value })
          }
          validationError={validationResults.identificator}
          value={identificator}
        />
        <small className="form-text text-muted" id="nameHelp">
          Sensor identificator for matching
        </small>
        <label class-name="mt-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="form-control mb-3"
          id="description"
          name="description"
          onChange={({ target }) =>
            this.handleChange({ description: target.value })
          }
          value={description}
        />
        <label class-name="mt-2" htmlFor="lat">
          Latitude
        </label>
        <Input
          className="form-control mb-3"
          id="lat"
          name="lat"
          onChange={({ target }) =>
            this.handleChange({ lat: parseFloat(target.value) })
          }
          value={lat}
        />
        <label class-name="mt-2" htmlFor="identificator">
          Longitude
        </label>
        <Input
          className="form-control mb-1"
          id="lng"
          name="lng"
          onChange={({ target }) =>
            this.handleChange({ lng: parseFloat(target.value) })
          }
          value={lng}
        />
        <small className="form-text text-muted" id="nameHelp">
          Longtitude and latitude are used in map vizualization
        </small>
        <label class-name="mt-3" htmlFor="datasource">
          Datasource
        </label>
        <select
          className="form-control mb-3"
          id="datasource"
          onChange={({ target }) =>
            this.handleChange({ datasource_type: target.value })
          }
          value={datasource_type}
        >
          {Object.keys(datasource).map((index) => (
            <option key={datasource[index]} value={datasource[index]}>
              {index}
            </option>
          ))}
        </select>
        {datasource_type === datasource.TEXT && (
          <>
            <label class-name="mt-2" htmlFor="separator">
              Separator
            </label>
            <input
              className="form-control mb-3"
              id="separator"
              name="separator"
              onChange={({ target }) =>
                this.handleChange({ separator: target.value })
              }
              value={separator}
            />
          </>
        )}
        <label class-name="mt-2" htmlFor="groups">
          Groups
        </label>

        <Select
          id="groups"
          isMulti
          onChange={(value) => this.handleChange({ groups: value })}
          options={groupsOptions}
          value={groups}
        />

        {mapper && (
          <Mapper
            datasource={datasource}
            datasource_type={datasource_type}
            editMapper={this.handleEditMapper}
            mapper={mapper}
            removeMapper={this.handleRemoveMapper}
          />
        )}
        <Button className="mt-3 mr-3" onClick={this.handleAddMapper}>
          Add Mapper
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

export default SensorForm

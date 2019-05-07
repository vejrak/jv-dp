// @flow

import React from 'react'
import { Button } from 'react-bootstrap'
import type {
  ContentType,
  ErrorResponse,
  SensorIdMapper as SensorIdMapperType,
} from '../../types'
import { createSensorIdMapper } from '../actions'
import Spinner from '../../components/Spinner'
import * as validation from '../../helpers/validation'
import Input from '../../components/Input'
import { isFormValid } from '../../helpers'

type Props = $ReadOnly<{|
  contentType: ContentType,
  isFetching: boolean,
  error: ?ErrorResponse,
  createSensorIdMapper: typeof createSensorIdMapper,
  sensorIdMapper?: SensorIdMapperType,
  updateSensorIdMapper: Function,
|}>

type State = {
  validationResults: validation.ValidationResults<*>,
  formData: {
    content_type: string,
    source_name: string,
    separator: string,
    from_byte: number,
    to_byte: number,
  },
}

class SensorIdMapperForm extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    const { sensorIdMapper } = props
    this.state = {
      formData: {
        source_name: (sensorIdMapper && sensorIdMapper.source_name) || '',
        content_type: (sensorIdMapper && sensorIdMapper.content_type) || '',
        separator: (sensorIdMapper && sensorIdMapper.separator) || '',
        from_byte: (sensorIdMapper && sensorIdMapper.from_byte) || 0,
        to_byte: (sensorIdMapper && sensorIdMapper.to_byte) || 0,
      },
      validationResults: {},
    }
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { contentType } = props
    const { formData } = state
    if (
      Object.keys(contentType).length > 0 &&
      state.formData.content_type === ''
    ) {
      return {
        formData: {
          ...formData,
          content_type: contentType[Object.keys(contentType)[0]],
        },
      }
    }

    return null
  }

  validate = () => {
    const {
      content_type,
      source_name,
      separator,
      from_byte,
      to_byte,
    } = this.state.formData
    const { contentType } = this.props
    if (content_type === contentType.JSON)
      return {
        source_name: validation.required(source_name),
      }
    if (content_type === contentType.TEXT) {
      return {
        source_name: validation.required(source_name),
        separator: validation.required(separator),
      }
    }
    if (content_type === contentType.BINARY) {
      return {
        from_byte: validation.isValidInteger(from_byte),
        to_byte: validation.isValidInteger(to_byte),
      }
    }
    return {}
  }

  resetSeparatorState = (value: Object) => {
    if (
      value.content_type &&
      value.content_type !== this.props.contentType.TEXT
    ) {
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
        validationResults,
        ...this.resetSeparatorState(value),
      },
    })
  }

  resetState = (): void => {
    this.setState({
      formData: {
        content_type: '',
        source_name: '',
        separator: '',
        from_byte: 0,
        to_byte: 0,
      },
      validationResults: {},
    })
  }

  handleClick = async () => {
    const { formData } = this.state
    const validationResults = this.validate()
    this.setState({ validationResults })
    if (isFormValid(validationResults)) {
      if (this.props.updateSensorIdMapper) {
        await this.props.updateSensorIdMapper({
          ...formData,
        })
      } else {
        await this.props.createSensorIdMapper({
          ...formData,
        })
        this.resetState()
      }
    }
  }

  render() {
    const {
      content_type,
      from_byte,
      to_byte,
      source_name,
      separator,
    } = this.state.formData
    const { validationResults } = this.state
    const { contentType, error, isFetching } = this.props

    if (isFetching) return <Spinner />
    return (
      <div className="form-sensorIdMapper mt-3">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error.errmsg}
          </div>
        )}
        <label class-name="mt-3" htmlFor="contentType">
          Datasource
        </label>
        <select
          className="form-control mb-1"
          id="contentType"
          onChange={({ target }) =>
            this.handleChange({ content_type: target.value })
          }
          value={content_type}
        >
          {Object.keys(contentType).map((index) => (
            <option key={contentType[index]} value={contentType[index]}>
              {index}
            </option>
          ))}
        </select>
        <small className="form-text text-muted mb-3" id="contentTypeHelp">
          Expected request content-type
        </small>
        {content_type !== contentType.BINARY && (
          <>
            <label class-source_name="mt-2" htmlFor="source_name">
              Source name
            </label>
            <Input
              className="form-control mb-1"
              id="source_name"
              name="source_name"
              onChange={({ target }) =>
                this.handleChange({ source_name: target.value })
              }
              validationError={validationResults.source_name}
              value={source_name}
            />
            <small className="form-text text-muted mb-3" id="sourceNameHelp">
              Path to value in JSON document or text Example for receive value
              in JSON:
              <br />
              {'key.value => {key: value}'}
            </small>
          </>
        )}
        {content_type === contentType.BINARY && (
          <>
            <label class-name="mt-2" htmlFor="from_byte">
              From byte
            </label>
            <input
              className="form-control mb-1"
              id="from_byte"
              name="from_byte"
              onChange={({ target }) => {
                const from_byte = parseInt(target.value, 10) || 0
                if (Number.isInteger(from_byte))
                  this.handleChange({ from_byte })
              }}
              validationError={validationResults.from_byte}
              value={from_byte}
            />
            <label class-name="mt-2" htmlFor="to_byte">
              To byte
            </label>
            <input
              className="form-control mb-1"
              id="to_byte"
              name="to_byte"
              onChange={({ target }) => {
                const to_byte = parseInt(target.value, 10) || 0
                if (Number.isInteger(to_byte)) this.handleChange({ to_byte })
              }}
              validationError={validationResults.to_byte}
              value={to_byte}
            />
            <small className="form-text text-muted" id="separatorHelp">
              Input string &quot;fabacde&quot; from byte 3 - to byte 4 =&gt;
              &quot;ba&quot;
            </small>
          </>
        )}
        {content_type === contentType.TEXT && (
          <>
            <label class-name="mt-2" htmlFor="separator">
              Separator
            </label>
            <input
              className="form-control mb-1"
              id="separator"
              name="separator"
              onChange={({ target }) =>
                this.handleChange({ separator: parseInt(target.value, 10) })
              }
              validationError={validationResults.separator}
              value={separator}
            />
            <small className="form-text text-muted" id="separatorHelp">
              Separator used in source name
            </small>
          </>
        )}
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

export default SensorIdMapperForm

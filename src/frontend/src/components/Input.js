// @flow

import React from 'react'
import getErrorMessage from '../helpers/validationErrors'

type Props = {
  validationError?: ?Object,
}

const Input = (props: Props) => {
  const { validationError, ...otherProps } = props
  const validationMessage = validationError && getErrorMessage(validationError)

  return (
    <div>
      <input {...otherProps} />
      {validationMessage && (
        <div className="alert alert-danger mt-1">{validationMessage}</div>
      )}
    </div>
  )
}

export default Input

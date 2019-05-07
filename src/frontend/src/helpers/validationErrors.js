// @flow
import * as validation from './validation'

const getValidationResultMessage = (error: Object) => {
  const messages: Object = {
    minLength: `${error.minLength} characters minimum.`,
    required: 'Please fill out this field.',
    invalidInteger: 'Field must be integer.',
    unitsInvalid: 'Units are invalid',
  }

  return messages[error.type]
}

const getErrorMessage = (error: ?validation.ValidationResult) => {
  if (!error) {
    return null
  }

  const messageData = getValidationResultMessage(error)
  return messageData || null
}

export default getErrorMessage

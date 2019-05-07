import React from 'react'
import renderer from 'react-test-renderer'
import BinaryMixedMapper from '../../src/sensor/mapper/BinaryMixedMapper'

const mockProps = {
  isFetching: false,
  error: null,
  index: 1,
  removeMapper: () => {},
  editMapper: () => {},
  metrics: [],
}

it('renders correctly', () => {
  const tree = renderer.create(<BinaryMixedMapper {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctlyi with data', () => {
  const tree = renderer
    .create(<BinaryMixedMapper source_name="key.value" {...mockProps} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

import React from 'react'
import renderer from 'react-test-renderer'
import BinaryMapper from '../../src/sensor/mapper/BinaryMapper'

const mockProps = {
  isFetching: false,
  error: null,
  index: 1,
  removeMapper: () => {},
  editMapper: () => {},
  metrics: [],
}

it('renders correctly', () => {
  const tree = renderer.create(<BinaryMapper {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly with data', () => {
  const tree = renderer
    .create(<BinaryMapper from_byte={1} to_byte={2} {...mockProps} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

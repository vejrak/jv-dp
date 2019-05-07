import React from 'react'
import renderer from 'react-test-renderer'
import BasicMapper from '../../src/sensor/mapper/BasicMapper'

const mockProps = {
  isFetching: false,
  error: null,
  index: 1,
  removeMapper: () => {},
  editMapper: () => {},
  metrics: [],
}

it('renders correctly', () => {
  const tree = renderer.create(<BasicMapper {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly with data', () => {
  const tree = renderer
    .create(<BasicMapper {...mockProps} source_name="key.name" />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

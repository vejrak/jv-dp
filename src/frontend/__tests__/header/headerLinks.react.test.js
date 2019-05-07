import React from 'react'
import renderer from 'react-test-renderer'
import HeaderLinks from '../../src/header/HeaderLinks'

it('renders correctly with loggin', () => {
  const tree = renderer.create(<HeaderLinks isLoggedIn rank={1} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly without login', () => {
  const tree = renderer
    .create(<HeaderLinks isLoggedIn={false} rank={null} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

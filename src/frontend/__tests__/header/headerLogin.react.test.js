import React from 'react'
import renderer from 'react-test-renderer'
import HeaderLogin from '../../src/header/HeaderLogin'

it('renders correctly with log in', () => {
  const tree = renderer
    .create(<HeaderLogin isLoggedIn logout={() => {}} name="test" />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly without log in', () => {
  const tree = renderer
    .create(<HeaderLogin isLoggedIn={false} logout={() => {}} name={null} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

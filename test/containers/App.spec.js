import expect from 'expect'
import expectJSX from 'expect-jsx'
expect.extend(expectJSX)
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import renderShallow from '../utils'

import ConnectedApp, { App } from '../../assets/js/containers/App'
import Index from '../../assets/js/containers/Index'

describe('App Container', () => {
  const renderShallowApp = (isBreak) => {
    return renderShallow(
      <App isBreak={ isBreak } />
    )
  }

  const renderApp = (isBreak) => {
    return TestUtils.renderIntoDocument(
      <App />
    )
  }

  it('should be of type div', () => {
    expect(renderShallowApp().type).toEqual('div')
  })

  it('should should have class of container', () => {
    expect(renderShallowApp().props.className).toEqual('container')
  })

  it('should not have class of is-break', () => {
    expect(renderShallowApp().props.className).toExclude('is-break')
  })

  it('should have a class of is-break when isBreak = true', () => {
    expect(renderShallowApp(true).props.className).toInclude('is-break')
  })
})

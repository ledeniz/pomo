import expect from 'expect'
import expectJSX from 'expect-jsx'
expect.extend(expectJSX)
import React from 'react'
import TestUtils from 'react-addons-test-utils'

import renderShallow from '../utils'

import Timer from '../../assets/js/components/timer'

describe('Timer Component', () => {
  const renderShallowTimer = (time) => {
    return renderShallow(<Timer time={ time } />)
  }

  it('should be of the type div', () => {
    expect(renderShallowTimer().type).toEqual('div')
  })

  it('should have the class of timer', () => {
    expect(renderShallowTimer().props.className).toEqual('timer')
  })

  it('should have the time it is passed via props', () => {
    expect(renderShallowTimer(40)).toIncludeJSX(40)
  })
})

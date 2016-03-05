import expect from 'expect'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import renderShallow from '../utils'

import Count from '../../assets/js/components/count'
import { initialState } from '../../assets/js/config'

describe('Count Component', () => {
  const renderShallowCount = (count) => {
    return renderShallow(<Count count={ count } />)
  }

  const renderCount = (count) => {
    return TestUtils.renderIntoDocument(
      <Count count={ count } />
    )
  }

  it('should be of type div', () => {
    expect(renderShallowCount().type).toEqual('div')
  })

  it('should have the class of count', () => {
    expect(renderShallowCount().props.className).toEqual('count')
  })

  it('should output { maxCount } (4) icons', () => {
    const countComponent = renderCount()

    const icons = TestUtils.scryRenderedDOMComponentsWithTag(countComponent, 'svg')

    expect(icons.length).toEqual(4)
  })
})

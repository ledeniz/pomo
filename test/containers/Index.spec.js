import expect, { createSpy } from 'expect'
import expectJSX from 'expect-jsx'
expect.extend(expectJSX)
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import renderShallow from '../utils'

import Index from '../../assets/js/containers/Index'
import Button from '../../assets/js/components/button'

import { startTimer, pauseTimer, resetTimer } from '../../assets/js/actions/index'

describe('Index Container', () => {
  const renderShallowIndex = () => {
    return renderShallow(
      <Index />
    )
  }

  const renderIndex = (props) => {
    return TestUtils.renderIntoDocument(
      <Index { ...props } />
    )
  }

  it('should be of type div', () => {
    expect(renderShallowIndex().type).toEqual('div')
  })

  it('should have a class of box', () => {
    expect(renderShallowIndex().props.className).toEqual('box')
  })

  it('should have a <Timer />', () => {
    expect(renderShallowIndex()).toIncludeJSX('Timer')
  })

  it('should have a <Count />', () => {
    expect(renderShallowIndex()).toIncludeJSX('Count')
  })

  it('should have 3 <Button />\'s', () => {
    const index = renderIndex()
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(index, 'button')

    expect(buttons.length).toEqual(3)
  })

  it('should show button label as \'Break\' when isBreak = true', () => {
    const index = renderIndex({ isBreak: true })
    const startButton = TestUtils.scryRenderedDOMComponentsWithTag(index, 'button')[0]

    expect(startButton.textContent).toEqual('Break')
  })

  it('should show button label as \'Work\' when isBreak = false', () => {
    const index = renderIndex({ isBreak: false })
    const startButton = TestUtils.scryRenderedDOMComponentsWithTag(index, 'button')[0]

    expect(startButton.textContent).toEqual('Work')
  })

  it('should not be disabled when isActive = false', () => {
    const index = renderIndex({ isActive: false })
    const button = TestUtils.scryRenderedDOMComponentsWithTag(index, 'button')[0]

    expect(button.disabled).toEqual(false)
  })

  it('should be disabled when isActive = true', () => {
    const index = renderIndex({ isActive: true })
    const button = TestUtils.scryRenderedDOMComponentsWithTag(index, 'button')[0]

    expect(button.disabled).toEqual(true)
  })

  it('should call dispatch on button clicks', () => {
    const props = {
      dispatch: createSpy()
    }

    const index = renderIndex(props)
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(index, 'button')

    buttons.forEach((button, index) => {
      TestUtils.Simulate.click(ReactDOM.findDOMNode(button))
      expect(props.dispatch.calls.length).toEqual(index + 1)
      buttons.shift()
    })
  })

  describe('Class Functions', () => {
    let index = null,
        props = {
          dispatch: createSpy()
        }

    beforeEach(() => {
      index = new Index(props)
    })

    afterEach(() => {
      index = null
    })

    it('should call onStart()', () => {
      index.onStart()
      expect(index.props.dispatch).toHaveBeenCalledWith(startTimer())
    })

    //it('should call onPause()', () => {
      //index.onPause()
      //expect(index.props.dispatch).toHaveBeenCalledWith(pauseTimer())
    //})

    it('should call onReset()', () => {
      index.onReset()
      expect(index.props.dispatch).toHaveBeenCalledWith(resetTimer())
    })

  })
})

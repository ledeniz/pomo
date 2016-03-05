import expect from 'expect'
import expectJSX from 'expect-jsx'
expect.extend(expectJSX)
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import renderShallow from '../utils'

import Button from '../../assets/js/components/button'

describe('Button Component', () => {
  const renderShallowButton = (title, disabled, onClick) => {
    return renderShallow(
      <Button title={ title } disabled={ disabled } onClick={ onClick }/>
    )
  }

  const renderButton = (title, disabled, onClick) => {
    return TestUtils.renderIntoDocument(
      <Button title={ title } disabled={ disabled } onClick={ onClick }/>
    )
  }

  it('should be of type button', () => {
    expect(renderShallowButton().type).toEqual('button')
  })

  it('should have a class of button', () => {
    expect(renderShallowButton().props.className).toEqual('button')
  })

  it('should have the title it was passed via props', () => {
    const expected = 'Test Title'

    expect(renderShallowButton('Test Title')).toIncludeJSX(expected)
  })

  it('should be disabled when passed disabled=true', () => {
    const expected = true
    expect(renderShallowButton(null, true).props.disabled).toEqual(expected)
  })

  it('should not be disabled by default', () => {
    const expected = false
    expect(renderShallowButton(null, false).props.disabled).toEqual(expected)
  })

  it('should call the passed onClick method when clicked', () => {
    const onClick = expect.createSpy()
    const button = renderButton(null, false, onClick)

    expect(button.props.onClick).toEqual(onClick)
    TestUtils.Simulate.click(ReactDOM.findDOMNode(button))
    expect(onClick.calls.length).toBe(1)
  })
})

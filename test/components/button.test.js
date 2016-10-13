import React from 'react'
import { shallow } from 'enzyme'
import test from 'ava'
import { spy } from 'sinon'

import Button from '../../assets/js/components/button'

const props = {
  title: 'Test Title',
  disabled: false,
  onClick: function () {}
}

test('should be of type button', t => {
  t.is(shallow(<Button { ...props } />).type(), 'button')
})

test('should have class of "button"', t => {
  t.true(shallow(<Button { ...props } />).hasClass('button'))
})

test('should have title passed in via props', t => {
  t.is(shallow(<Button { ...props } />).text(), props.title)
})

test('should be disabled when passed "disabled=true"', t => {
  t.is(shallow(<Button { ...props } disabled="true" />).prop('disabled'), 'true')
})

test('should not be disabled by default', t => {
  t.is(shallow(<Button />).prop('disabled'), undefined)
})

test('should call passed onClick', t => {
  const onClick = spy()
  const wrapper = shallow(<Button { ...props } onClick={ onClick } />)

  wrapper.simulate('click')

  t.true(onClick.called)
})

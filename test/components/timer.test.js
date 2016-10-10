import React from 'react'
import { shallow, mount } from 'enzyme'
import test from 'ava'

import Timer from '../../assets/js/components/timer'

test('should be of type div', t => {
  t.is(shallow(<Timer />).type(), 'div')
})

test('should have class of "timer"', t => {
  t.true(shallow(<Timer />).hasClass('timer'))
})

test('should have title passed in via props', t => {
  t.is(shallow(<Timer time="260" />).text(), '04 : 20')
})

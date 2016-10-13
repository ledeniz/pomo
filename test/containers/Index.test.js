import React from 'react'
import { shallow, mount } from 'enzyme'
import test from 'ava'
import { spy } from 'sinon'

import Index from '../../assets/js/containers/Index'
import Button from '../../assets/js/components/button'
import Timer from '../../assets/js/components/timer'
import Count from '../../assets/js/components/count'

import { startTimer, pauseTimer, resetTimer } from '../../assets/js/actions/index'

const stockProps = {
  dispatch: function() {},
  time: 420
}

test('should be of type div', t => {
  t.is(shallow(<Index { ...stockProps } />).type(), 'div')
})

test('should have class of "box"', t => {
  t.is(shallow(<Index { ...stockProps } />).find('.box').length, 1)
})

test('should have a <Timer />', t => {
  t.is(shallow(<Index { ...stockProps } />).find(Timer).length, 1)
})

test('should have a <Count />', t => {
  t.is(shallow(<Index { ...stockProps } />).find(Count).length, 1)
})

test('should have 2 <Button />', t => {
  t.is(shallow(<Index { ...stockProps } />).find(Button).length, 2)
})

test('should show button label as "Work" when isBreak=false', t => {
  t.is(mount(<Index { ...stockProps } />).find(Button).at(0).text(), 'Work')
})

test('should show button label as "Break" when isBreak=true', t => {
  t.is(mount(<Index { ...stockProps } isBreak="true" />).find(Button).at(0).text(), 'Break')
})

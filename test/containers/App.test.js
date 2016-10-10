import React from 'react'
import { shallow, mount } from 'enzyme'
import test from 'ava'
import { spy } from 'sinon'

import ConnectedApp, { App } from '../../assets/js/containers/App'
import Index from '../../assets/js/containers/Index'

test('should be of type div', t => {
  t.is(shallow(<App />).type(), 'div')
})

test('should have class of "container"', t => {
  t.true(shallow(<App />).hasClass('container'))
})

test('should not have class of "is-break" when not on a break', t => {
  t.false(shallow(<App />).hasClass('is-break'))
})

test('should have class of "is-break" when on a break', t => {
  t.true(shallow(<App isBreak={ true } />).hasClass('is-break'))
})

test('should have a child of "Index"', t => {
  t.is(shallow(<App />).find(Index).length, 1)
})

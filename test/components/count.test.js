import React from 'react'
import { shallow, mount } from 'enzyme'
import test from 'ava'

import Count from '../../assets/js/components/count.jsx'
import CountItem from '../../assets/js/components/count-item.jsx'
import { initialData } from '../../assets/js/config'

test('should be of type div', t => {
  t.is(shallow(<Count />).type(), 'div')
})

test('should have class of "count"', t => {
  t.true(shallow(<Count />).hasClass('count'))
})

test('should output { maxCount } (4) icons', t => {
  t.is(shallow(<Count maxCount={ initialData.maxCount }/>).find(CountItem).length, initialData.maxCount)
})

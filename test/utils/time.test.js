import test from 'ava'

import {
  formatTime,
  padTime,
  calcTimeDifference,
  getUnixTimestamp
} from '../../assets/js/utils/time'

test('should format time correctly', t => {
  const actual = 260,
        expected = '04 : 20'

  t.is(formatTime(actual), expected)
})

test('should pad time correctly', t => {
  const actual = 9,
    expected = '09' //not perfect, but we are not allowed to use 09 (int)

  t.is(padTime(actual), expected)
})

test('should calculate time difference', t => {
  const startTime = getUnixTimestamp(),
        endTime = getUnixTimestamp() + 10,
        expected = 10

  t.is(calcTimeDifference(startTime, endTime), expected)
})

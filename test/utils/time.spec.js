import expect from 'expect'

import {
  formatTime,
  padTime,
  calcTimeDifference,
  getUnixTimestamp
} from '../../assets/js/utils/time'

describe('Utilities', () => {
  describe('Time', () => {
    it('should format the time correctly', () => {
      const actual = 260,
            expected = '04 : 20'

      expect(formatTime(actual)).toEqual(expected)
    })

    it('should pad the time correctly', () => {
      const actual = 9,
            expected = '09' //not perfect, but we are not allowed to use 09 (int)

      expect(padTime(actual)).toEqual(expected)
    })

    it('should calculate time difference', () => {
      const startTime = getUnixTimestamp(),
            endTime = getUnixTimestamp() + 10,
            expected = 10

      expect(calcTimeDifference(startTime, endTime)).toEqual(expected)
    })
  })
})

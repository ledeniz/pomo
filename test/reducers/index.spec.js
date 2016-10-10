import expect from 'expect'
import expectJSX from 'expect-jsx'

import reducer from '../../assets/js/reducers/index'
import * as types from '../../assets/js/constants/index'
import { initialState } from '../../assets/js/config'
import { getUnixTimestamp } from '../../assets/js/utils/time'

describe('Reducer', () => {

  describe('Default', () => {
    it('should handle initialState', () => {
      expect(
        reducer(undefined, { })
      ).toEqual(initialState)
    })
  })

  describe('TIMER_START', () => {
    it('should handle TIMER_START', () => {
      expect(
        reducer([], {
          type: types.TIMER_START,
          intervalId: 23,
          startTime: getUnixTimestamp()
        })
      ).toEqual(
        {
          intervalId: 23,
          startTime: getUnixTimestamp(),
          isActive: true
        }
      )
    })
  })

  describe('TIMER_RESET', () => {
    const state = {
      intervalId: 23,
      isActive: true,
      breakTime: 12345,
      workTime: 54321,
      count: 4
    }

    it('should handle resetting the timer', () => {
      expect(
        reducer(state, { type: types.TIMER_RESET })
      ).toEqual(initialState)

      expect(
        reducer(state, { type: types.TIMER_RESET })
      ).toNotEqual(state)
    })

    it('should handle empty state reset', () => {
      expect(reducer({ }, { type: types.TIMER_RESET })
      ).toEqual(initialState)
    })
  })

  describe('TIMER_TICK', () => {
    it('should handle timer tick for a break', () => {
      const state = Object.assign({ }, initialState, {
        count: 1,
        isBreak: true
      })

      const expected = Object.assign({ }, state, {
        time: initialState.breakTime - 5
      })

      expect(
        reducer(state,
          {
            type: types.TIMER_TICK,
            time: 5
          }
        )
      ).toEqual(expected)
    })

    it('should handle tick for work', () => {
      const state = Object.assign({ }, initialState, {
        count: 2,
        isBreak: false
      })

      const expected = Object.assign({ }, state, {
        time: initialState.workTime - 5
      })

      expect(
        reducer(state,
          {
            type: types.TIMER_TICK,
            time: 5
          }
        )
      ).toEqual(expected)
    })

    it('should handle a long break tick', () => {
      const state = Object.assign({ }, initialState, {
        count: 4,
        isBreak: true
      })

      const expected = Object.assign({ }, state, {
        time: initialState.longBreakTime - 5
      })

      expect(
        reducer(state,
          {
            type: types.TIMER_TICK,
            time: 5
          }
        )
      ).toEqual(expected)
    })

    it('should handle a paused tick', () => {
      const state = Object.assign({ }, initialState, {
        count: 2,
        isBreak: true,
        wasPaused: true,
        pausedTime: 120
      })

      const expected = Object.assign({ }, state, {
        time: state.pausedTime - 5
      })

      expect(
        reducer(state,
          {
            type: types.TIMER_TICK,
            time: 5
          }
        )
      ).toEqual(expected)
    })
  })

  describe('TIMER_END', () => {
    it('should handle ending a break', () => {
      const state = Object.assign({ }, initialState, {
        count: 1,
        intervalId: 23,
        isActive: true,
        isBreak: true,
        isFinale: false,
        pausedTime: 43,
        startTime: 5000,
        time: 0,
        wasPaused: true
      })

      const expected = Object.assign({ }, initialState, {
        count: 1,
        intervalId: null,
        isActive: !state.isActive,
        isBreak: false,
        pausedTime: 0,
        startTime: 0,
        wasPaused: false,
        time: initialState.time
      })

      expect(
        reducer(state,
          {
            type: types.TIMER_END
          }
        )
      ).toEqual(expected)
    })

    it('should handle ending a work cycle', () => {
      const state = Object.assign({ }, initialState, {
        count: 1,
        intervalId: 23,
        isActive: true,
        isBreak: false,
        isFinale: false,
        pausedTime: 43,
        startTime: 5000,
        time: 0,
        wasPaused: true
      })

      const expected = Object.assign({ }, initialState, {
        count: state.count + 1,
        intervalId: null,
        isActive: !state.isActive,
        isBreak: true,
        pausedTime: 0,
        startTime: 0,
        time: initialState.breakTime,
        wasPaused: false
      })

      expect(
        reducer(state,
          {
            type: types.TIMER_END
          }
        )
      ).toEqual(expected)
    })

    it('should handle the finale', () => {
      const state = Object.assign({ }, initialState, {
        count: 3,
        intervalId: 23,
        isActive: true,
        isBreak: false,
        pausedTime: 43,
        startTime: 5000,
        time: 0,
        wasPaused: true
      })

      const expected = Object.assign({ }, initialState, {
        count: state.count + 1,
        intervalId: null,
        isActive: !state.isActive,
        isBreak: true,
        pausedTime: 0,
        startTime: 0,
        time: initialState.longBreakTime,
        wasPaused: false
      })

      expect(
        reducer(state,
          {
            type: types.TIMER_END
          }
        )
      ).toEqual(expected)
    })
  })
})

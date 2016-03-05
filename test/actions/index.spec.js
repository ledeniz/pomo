import expect, { spyOn, restoreSpies } from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { initialState, soundsData } from '../../assets/js/config'

import * as types from '../../assets/js/constants/index'
import * as actions from '../../assets/js/actions/index'
import * as TimeUtils from '../../assets/js/utils/time'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Actions', () => {
  describe('End Timer', () => {
    it('should end the timer', (done) => {
      const expectedActions = [
        { type: 'TIMER_END', isFinale: false, meta: { sound: 'notification' } }
      ]

      const store = mockStore(initialState, expectedActions)

      store.dispatch(actions.endTimer())

      done()
    })

    it('should handle the finale', (done) => {
      const state = {
        count: 4,
        intervalId: 23,
        isFinale: false
      }

      const expectedActions = [
        { type: 'TIMER_END', isFinale: true, meta: { sound: 'notification' } }
      ]

      const store = mockStore(state, expectedActions)

      store.dispatch(actions.endTimer())

      done()
    })
  })

  describe('Reset Timer', () => {
    it('should reset the timer', (done) => {
      const intervalId = setInterval(() => { }, 1000)

      const state = {
        intervalId
      }

      const expectedActions = [
        { type: 'TIMER_RESET', intervalId: null }
      ]

      const store = mockStore(state, expectedActions)

      store.dispatch(actions.resetTimer())

      done()
    })
  })

  describe('Start Timer', () => {
    /**
     * We create a setInterval within the action creator
     * so we stub it here to control the creation.
     */
    beforeEach(() => {
      spyOn(global, 'setInterval').andReturn(23);
    });

    afterEach(() => {
      restoreSpies()
    });

    it('should handle starting the timer', (done) => {
      const startTime = TimeUtils.getUnixTimestamp(),
            intervalId = 23

      const expectedActions = [
        { type: 'TIMER_START', intervalId, startTime }
      ]

      const store = mockStore([], expectedActions)

      store.dispatch(actions.startTimer())

      done()
    })

    /**
     * This may seem very magicky, but it is not.
     * unixResults stores a sequential list of values that will be called
     * As our stubbed getUnixTimestamp is going to be called [2] times during
     * this call, we provide [2] values. These two values will be later used
     * to calculate the time difference, which will be: 10 - 5 = 5.
     * We then test in our expected actions that is what is returned.
     *
     * The reasoning behind this is: there is no way to accurately use
     * the natural getUnixTimestamp result as we could never confirm
     * the return `time` value with any degree of certainty.
     *
     * It is not super elegant, but boy does it work.
     */
    it('should handle a tick', (done) => {
      const spyInterval = spyOn(global, 'setInterval'),
            unixResults = [5, 10]

      const spyUnix = spyOn(TimeUtils, 'getUnixTimestamp').andCall(() => {
        return unixResults[spyUnix.calls.length - 1]
      })

      const startTime = unixResults[0],
            intervalId = 23

      const state = {
        time: unixResults[1]
      }

      const expectedActions = [
        { type: 'TIMER_START', intervalId, startTime },
        { type: 'TIMER_TICK', time: unixResults[0] }
      ]

      const store = mockStore(state, expectedActions)

      store.dispatch(actions.startTimer())

      spyInterval.calls[0].arguments[0]() //call our setInterval mock to trigger TIMER_TICK

      done()
    })

    it('should handle a finished tick (time = 0)', (done) => {
      const spyInterval = spyOn(global, 'setInterval'),
            unixResults = [5, 5]

      const spyUnix = spyOn(TimeUtils, 'getUnixTimestamp').andCall(() => {
        return unixResults[spyUnix.calls.length - 1]
      })

      const startTime = unixResults[0],
            intervalId = 23

      const expectedActions = [
        { type: 'TIMER_START', intervalId, startTime },
        { type: 'TIMER_END', isFinale: false, meta: { sound: 'notification' } }
      ]

      const store = mockStore({ time: 0, isFinale: false }, expectedActions)

      store.dispatch(actions.startTimer())

      spyInterval.calls[0].arguments[0]() //call our setInterval mock to trigger TIMER_TICK

      done()
    })
  })
})

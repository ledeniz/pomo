import test from 'ava'
import { spy, stub } from 'sinon'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { initialData, soundsData } from '../../assets/js/config'

import * as types from '../../assets/js/constants/index'
import * as actions from '../../assets/js/actions/index'
import * as TimeUtils from '../../assets/js/utils/time'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

test('should end timer', t => {
  const expectedAction = {
    type: 'TIMER_END', isFinale: false, meta: { sound: 'notification' }
  }

  const store = mockStore(initialData)

  t.deepEqual(store.dispatch(actions.endTimer()), expectedAction)
})

test('should handle the finale', t => {
  const state = {
    count: 4,
    intervalId: 23,
    isFinale: false
  }

  const expectedAction = {
    type: 'TIMER_END', isFinale: true, meta: { sound: 'notification' }
  }

  const store = mockStore(state)

  t.deepEqual(store.dispatch(actions.endTimer()), expectedAction)
})

test('should reset the timer', t => {
  const intervalId = setInterval(() => { }, 1000)

  const state = {
    intervalId
  }

  const expectedAction = { type: 'TIMER_RESET', intervalId: null }

  const store = mockStore(state)

  t.deepEqual(store.dispatch(actions.resetTimer()), expectedAction)
})

test.before(t => {
  stub(global, 'setInterval').returns(23)
})

test.after(t => {
  global.setInterval.restore()
})

test('should start the timer', t => {
  const startTime = TimeUtils.getUnixTimestamp(),
        intervalId = 23

  const expectedAction = { type: 'TIMER_START', intervalId, startTime }
  const store = mockStore()

  t.deepEqual(store.dispatch(actions.startTimer()), expectedAction)
})

test('should pause the timer', t => {
  const intervalId = 23

  const expectedAction = { type: 'TIMER_PAUSE' }
  const store = mockStore({
    intervalId
  })

  t.deepEqual(store.dispatch(actions.startTimer()), expectedAction)
})

import {
  TIMER_START,
  TIMER_PAUSE,
  TIMER_RESET,
  TIMER_TICK,
  TIMER_END
} from '../constants/index'

import { calcTimeDifference, getUnixTimestamp } from '../utils/time'

import { notification } from './../utils/notification'

export const startTimer = () => {
  const startTime = getUnixTimestamp()

  return (dispatch, getState) => {
    if (getState().intervalId) {
      return dispatch(pauseTimer(getState().intervalId))
    }

    const intervalId = setInterval(() => {
      if (getState().time <= 0) {
        return dispatch(endTimer(getState()))
      }

      return dispatch({ type: TIMER_TICK, time: calcTimeDifference(startTime, getUnixTimestamp()) })
    }, 1000)

    return dispatch({ type: TIMER_START, intervalId, startTime })
  }
}

export const pauseTimer = (intervalId) => {
  clearInterval(intervalId)
  return { type: TIMER_PAUSE }
}

export const resetTimer = () => {
  return (dispatch, getState) => {
    clearInterval(getState().intervalId)
    return dispatch({ type: TIMER_RESET, intervalId: null })
  }
}

export const endTimer = () => {
  return (dispatch, getState) => {
    let { isFinale, intervalId, count, isBreak } = getState()

    clearInterval(intervalId)

    if (count === 4) {
      isFinale = true
    }

    const cycle = (isBreak) ? 'Break' : 'Work'
    const action = (isBreak) ? 'work' : 'relax'

    notification(`${ cycle } has ended, time to ${ action }!`)

    return dispatch({
      type: TIMER_END,
      isFinale,
      meta: { sound: action }
    })
  }
}

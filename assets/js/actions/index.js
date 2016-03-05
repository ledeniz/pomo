import {
  TIMER_START,
  TIMER_RESET,
  TIMER_TICK,
  TIMER_END
} from '../constants/index'

import { calcTimeDifference, getUnixTimestamp } from '../utils/time'


export function startTimer () {
  const startTime = getUnixTimestamp()

  return (dispatch, getState) => {
    const intervalId = setInterval(() => {
      if (getState().time === 0 || getState().time <= 0) {
        return dispatch(endTimer(getState()))
      }

      return dispatch({ type: TIMER_TICK, time: calcTimeDifference(startTime, getUnixTimestamp()) })
    }, 1000)

    dispatch({ type: TIMER_START, intervalId, startTime })
  }
}

export function resetTimer () {
  return (dispatch, getState) => {
    clearInterval(getState().intervalId)

    return dispatch({ type: TIMER_RESET, intervalId: null })
  }
}

export function endTimer () {
  return (dispatch, getState) => {
    let { isFinale, intervalId, count } = getState()

    clearInterval(intervalId)

    if (count === 4) {
      isFinale = true
    }

    return dispatch({
      type: TIMER_END,
      isFinale,
      meta: { sound: 'notification' }
    })
  }
}

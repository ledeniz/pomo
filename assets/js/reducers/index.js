import {
  TIMER_START,
  TIMER_RESET,
  TIMER_TICK,
  TIMER_END
} from '../constants/index'

import { initialState } from '../config'

export default function (state = initialState, action) {
  switch (action.type) {
    case TIMER_START:
      return Object.assign({ }, state, {
        intervalId: action.intervalId,
        startTime: action.startTime,
        isActive: true
      })

    case TIMER_TICK:
      return Object.assign({ }, state, {
        time:
          ((state.wasPaused) ? state.pausedTime :
          (state.count >= 4 && state.isBreak)
          ? state.longBreakTime : (state.isBreak)
          ? state.breakTime : state.workTime) - action.time,
      })

    case TIMER_END:
      return Object.assign({ }, state, {
        intervalId: null,
        isActive: false,
        startTime: 0,
        isBreak: !state.isBreak,
        wasPaused: false,
        pausedTime: 0,
        count:
          (action.isFinale) ? 0 :
          (!state.isBreak) ? (state.count + 1) : state.count,
        time:
          (state.count >= 3 && !state.isBreak)
          ? state.longBreakTime :  (!state.isBreak)
          ? state.breakTime : state.workTime
      })

    case TIMER_RESET:
      return initialState

    default:
      return state
  }
}

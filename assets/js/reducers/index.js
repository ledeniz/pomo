import {
  TIMER_START,
  TIMER_PAUSE,
  TIMER_RESET,
  TIMER_TICK,
  TIMER_END,

  NOTIFICATIONS_SET
} from '../constants/index'

import { initialData, initialProdData } from './../config'

const isProd = process.env.node_ENV === 'production'
const initialState = (isProd) ? initialProdData : initialData

export default function (state = initialState, action) {
  switch (action.type) {
    case TIMER_START:
      return Object.assign({ }, state, {
        intervalId: action.intervalId,
        isActive: true,
        startTime: action.startTime
      })

    case TIMER_TICK:
      return Object.assign({ }, state, {
        time:
        //IF was paused, continue from paused time
        //IF Count >= 4 AND isBreak = longBreak
        //ELSE IF isBreak = break
        //ELSE = workTime
        ((state.wasPaused) ? state.pausedTime :
          (state.count >= 4 && state.isBreak)
          ? state.longBreakTime : state.isBreak
          ? state.breakTime : state.workTime) - action.time,
      })

    case TIMER_PAUSE:
      return Object.assign({ }, state, {
        isActive: false,
        intervalId: null,
        startTime: 0,
        wasPaused: true,
        pausedTime: state.time
      })

    case TIMER_END:
      return Object.assign({ }, state, {
        intervalId: null,
        isActive: false,
        startTime: 0,
        isBreak: !state.isBreak,
        count:
          //IF the final count, reset
          //IF we are on a break, do not increase count
          (action.isFinale) ? 0 :
          (state.isBreak) ? state.count : (state.count + 1),
        time:
          //IF we are on our last cycle and not on a break
          //Return long break
          //ELSE IF we are not on a break, return break time
          //ELSE return work time
          (state.count >= 3 && !state.isBreak)
          ? state.longBreakTime :  (!state.isBreak)
          ? state.breakTime : state.workTime,
        wasPaused: false,
        pausedTime: 0
      })

    case TIMER_RESET:
      return Object.assign({ }, initialState, {
        notifications: state.notifications
      })

    case NOTIFICATIONS_SET:
      return Object.assign({ }, state, {
        notifications: action.toggle
      })

    default:
      return state
  }
}

import React from 'react'

import { formatTime } from '../utils/time'

const Timer = ({ time }) => {
  return (
    <div className="timer">
      { formatTime(time) }
    </div>
  )
}

export default Timer

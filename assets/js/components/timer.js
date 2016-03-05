import React, { Component } from 'react'
import classNames from 'classnames'

import { formatTime, padTime } from '../utils/time'

export default class Timer extends Component {
  render () {
    const time = formatTime(this.props.time),
          classes = classNames({
            'timer': true
          })

    return (
      <div className={ classes }>
        { time }
      </div>
    )
  }
}

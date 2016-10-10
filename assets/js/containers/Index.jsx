import React, { Component } from 'react'

import Button from '../components/button.jsx'
import Timer from '../components/timer.jsx'
import Count from '../components/count.jsx'
import Keybindings from '../components/keybindings.jsx'
import Notifications from '../components/notifications.jsx'

import { startTimer, resetTimer } from '../actions/index'
import { notificationsSet, notificationsRequest } from '../actions/notifications'

export default class Index extends Component {
  constructor (props) {
    super(props)

    addEventListener('keyup', this.handleKeyUp)

    this.props.dispatch(notificationsRequest())
  }

  render () {
    const { time, isBreak, count, maxCount, isActive, notifications } = this.props

    return (
      <div>
        <div className="box">
          <Timer time={ time } />
          <Button
            title={ ((isActive) ? "Pause" : isBreak ? "Break" : "Work") }
            onClick={ this.onStart }
          />
          <Button
            title={ 'Reset' }
            onClick={ this.onReset }
          />
          <Count count={ count } maxCount={ maxCount }/>
        </div>

        <div className="links">
          <div className="link hide-mobile">
            <Keybindings />
          </div>
          <span className="spacer">|</span>

          <Notifications
            notifications={ notifications }
            onClick={ this.handleNotificationsClick }
          />

          <a className="link" href="http://github.com/tomspeak/pomodo.work">Code</a>
        </div>
      </div>
    )
  }

  onStart = () => {
    this.props.dispatch(startTimer())
  }

  onReset = () => {
    this.props.dispatch(resetTimer(this.props.intervalId))
  }

  handleKeyUp = (e) => {
    switch (e.code) {
      case "Space":
        this.onStart()
        break
      case "KeyR":
        this.onReset()
        break
      default:
        break
    }
  }

  handleNotificationsClick = (e) => {
    e.preventDefault()
    this.props.dispatch(notificationsRequest())
  }
}

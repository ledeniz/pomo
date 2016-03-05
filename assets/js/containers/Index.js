import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../components/button'
import Timer from '../components/timer'
import Count from '../components/count'

import { startTimer, resetTimer } from '../actions/index'

export default class Index extends Component {
  constructor (props) {
    super(props)


  }

  render () {
    const { time, isBreak, count, isActive } = this.props

    return (
      <div className={ 'box' }>
        <Timer time={ time } />
        <Button
          title={ isBreak ? "Break" : "Work" }
          onClick={ this.onStart }
          disabled={ isActive }
        />
        <Button
          title={ 'Reset' }
          onClick={ this.onReset }
        />
        <Count count={ count } />
      </div>
    )
  }

  onStart = () => {
    this.props.dispatch(startTimer())
  }

  onReset = () => {
    this.props.dispatch(resetTimer(this.props.intervalId))
  }
}

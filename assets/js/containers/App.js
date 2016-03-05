import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Index from './Index'
require('../../css/main.css')

export class App extends Component {
  render () {
    const classes = classNames({
      'container': true,
      'is-break': this.props.isBreak
    })

    return (
      <div className={ classes }>
        <Index { ...this.props } />
      </div>
    )
  }
}

/* istanbul ignore next */
function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps)(App)

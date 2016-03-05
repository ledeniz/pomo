import React, { Component } from 'react'
import classNames from 'classnames'

export default class Button extends Component {
  render () {
    const { title, disabled, onClick } = this.props,
          classes = classNames({
            'button': true,
          })

    return (
      <button disabled={ disabled } className={ classes } onClick={ onClick }>
        { title }
      </button>
    )
  }
}

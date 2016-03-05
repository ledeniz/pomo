import React, { Component } from 'react'

export default class CountItem extends Component {
  render () {
    return (
      <svg className={ this.props.className } viewBox="0 0 242 216">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <text fill="#191E3F" fontFamily="Zapf Dingbats" fontSize="300" fontWeight="normal">
            <tspan x="-9.95703125" y="212" fill="#000000">❍</tspan>
          </text>
        </g>
      </svg>
    )
  }
}

import React, { Component } from 'react'
import classNames from 'classnames'

import { initialState } from '../config'
import CountItem from './count-item'

export default class Count extends Component {
  render () {

    let { count } = this.props,
        { maxCount } = initialState,
        classes = classNames({
          'count': true
        })


    let element = ''


    //I dont like for loops OK sorry
    element = [...Array(maxCount)].map((value, key) => {
      return <CountItem key={ key } className={ count > key ? 'is-active' : '' } />



    })




    return (
      <div className={ classes }>
        { element }
      </div>
    )
  }
}

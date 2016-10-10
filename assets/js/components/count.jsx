import React from 'react'

import CountItem from './count-item.jsx'

const Count = ({ count, maxCount }) => {
  return (
    <div className="count">
      { [...Array(maxCount)].map((value, key) => {
        return <CountItem key={ key } className={ count > key ? 'is-active' : '' } />
      }) }
    </div>
  )
}

export default Count

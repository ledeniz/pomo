import React from 'react'

const Button = ({ title, disabled, onClick }) => {
  return (
    <button disabled={ disabled } className='button' onClick={ onClick }>
      { title }
    </button>
  )
}

export default Button

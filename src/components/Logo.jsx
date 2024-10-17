import React from 'react'
import logo from '../assets/logo.png'

function Logo({width='100px'}) {
  return (
    <img src={logo} alt="Logo" className='w-16 sm:w-20 md:w-40' width={width} />
  )
}

export default Logo
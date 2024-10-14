import React from 'react'
import logo from '../assets/Screenshot_2024-08-31_222416-removebg-preview.png'

function Logo({width='100px'}) {
  return (
    // <img src="src\assets\Screenshot_2024-08-31_222416-removebg-preview.png" alt="Logo" width={width} />
    <img src={logo} alt="Logo" width={width} />
  )
}

export default Logo
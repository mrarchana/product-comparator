import React from 'react'
import {Link} from 'react-router-dom'
const Nav = () => {
  return (
    <div className='nav-container'>
      <div className='nav'>
      <Link id='home' to="/" >Home</Link>
          <h3 className='title'>Product Comparator</h3>
      </div>
    </div>
  )
}

export default Nav

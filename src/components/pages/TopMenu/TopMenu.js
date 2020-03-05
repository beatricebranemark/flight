import React, {useState, useEffect} from 'react'
import {withRouter, NavLink } from 'react-router-dom'

import './TopMenu.css'
const TopMenu = props => {
  return (
    <nav
      id='navBar'
      className='navbar navbar-expand-lg navbar-light bg-light'
    >
      <NavLink exact to="/" id="FLIGHT">
        <h1 id='topMenuLeft' className='navbar-brand' href='#'>
          Flight
        </h1>
      </NavLink>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div
        className='collapse navbar-collapse'
        id='navbarSupportedContent'
      >
        <ul className='navbar-nav mr-auto'></ul>
        <div id='topMenuRight' className='form-inline'>
          <NavLink to="/seeOrg"
            className='menuButton'
          >
            Visualisation
          </NavLink>
          <NavLink to="/howitworks"
            className='menuButton'
          >
            How it works
          </NavLink>
          <NavLink to="/about"
            className='menuButton'
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(TopMenu)

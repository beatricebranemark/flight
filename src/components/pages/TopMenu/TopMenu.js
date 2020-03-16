import React, {useState, useEffect} from 'react'
import {withRouter, NavLink, Link } from 'react-router-dom'
import store from '../../../reducers'

import './TopMenu.css'
const TopMenu = props => {
  const [currentSchool, setCurrentSchool] = useState(
    store.getState().getSelectedSchool.data.length > 0
      ? store.getState().getSelectedSchool.data[0].key
      : ''
  )




  return (
    <nav
      id='navBar'
      className='navbar navbar-expand-lg navbar-light bg-light'
    >
      <NavLink exact to="/" id="FLIGHT">
        <h1 id='topMenuLeft' className='navbar-brand' href='#'>
          FLIGHT FIGHTERS
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
          {currentSchool === '' ? <Link exact to="/" className='menuButton'>
        Visualization
      </Link> :
      <NavLink to="/seeOrg"
        className='menuButton'>
        Visualization
      </NavLink> }
          <NavLink to="/about"
            className='menuButton'
          >
            About
          </NavLink>
          <NavLink to="/howitworks"
            className='menuButton'
          >
            How it works
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(TopMenu)

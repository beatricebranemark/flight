import React, {useState,  useEffect} from 'react'
import { withRouter } from "react-router-dom";

import './TopMenu.css'
const TopMenu = (props) => {
  

  
    return  (
    
        <nav id="navBar" className="navbar navbar-expand-lg navbar-light bg-light">
        <a onClick={() => props.history.push('/')}><h1 id="topMenuLeft" class="navbar-brand" href="#">Flight</h1></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          </ul>
          <form id="topMenuRight"className="form-inline">
          <a onClick={() => props.history.push('/seeOrg')}className="menuButton">Visualisation</a>
            <a onClick={() => props.history.push('/howitworks')} className="menuButton">How it works</a>
            <a onClick={() => props.props.history.push('/about')} className="menuButton">About</a>
          </form>
        </div>
      </nav>
        
    )
   

  }

 

export default withRouter(TopMenu)

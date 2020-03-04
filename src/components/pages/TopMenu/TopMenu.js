import React, {useState, useEffect} from 'react'

import './TopMenu.css'
const TopMenu = (props) => {
  
    return  (
    
        <nav id="navBar" class="navbar navbar-expand-lg navbar-light bg-light">
        <h1 id="topMenuLeft" class="navbar-brand" href="#">Flight</h1>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            
           
            
            
          </ul>
          <form id="topMenuRight"class="form-inline">
          <button onClick={() => props.props.history.push('/seeOrg')}id="menuButton" type="button" class="btn btn-outline-light btn-lg m-2 my-2 my-sm-0">Visualisation</button>
            <button id="menuButton" class="btn btn-outline-light btn-lg m-2 my-2 my-sm-0" type="submit">How it works</button>
            <button onClick={() => props.props.history.push('/about')} id="menuButton" class="btn btn-outline-light btn-lg m-2 my-2 my-sm-0">About</button>
          </form>
        </div>
      </nav>
        
    )
   

  }

 

export default TopMenu

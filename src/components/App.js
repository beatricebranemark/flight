import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import firebaseConfig from '../config/firebase'

import Router from './Router'
import filterSchoolAndOrg from '../data/FilterScoolAndOrg'
//import Filter from 'Filter.js'

import '../css/style.css'

function App() {
  const firebase = require('firebase/app')
  firebase.initializeApp(firebaseConfig)

  let selectedSchool = 'ECS'
  let selectedOrg = 'TEORETISK DATOLOGI'
  //filterSchoolAndOrg.setSchool(selectedSchool) //Initziating Model
  filterSchoolAndOrg.setAllData()
  //filterSchoolAndOrg.setOrg(selectedOrg)
  return (
    <BrowserRouter>
      <div className='App'>
        <Router />
      </div>
    </BrowserRouter>
  )
}

export default App

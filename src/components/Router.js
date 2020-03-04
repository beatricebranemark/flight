import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './pages/home/Home'
import D3Index from './pages/D3/D3Index'
import HomeScreen from './pages/D3/HomeScreen'

import SelectSchool from './pages/selectSchool/SelectSchool'
import ChordsDiagram from './pages/ChordDiagram/ChordDiagram'
import About from './pages/About/About'
import HowItWorks from './pages/HowItWorks/HowItWorks'
const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={HomeScreen} />
      <Route exact path ='/seeOrg' component={D3Index} />
      <Route exact path ='/about' component={About} />
      <Route path='/howitworks' component={HowItWorks} />
      <Route path='/home' component={Home} />
      <Route path='/selectschool' component={SelectSchool} />
    </Switch>
  )
}

export default Router

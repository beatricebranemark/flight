import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './pages/home/Home'
import D3Index from './pages/D3/D3Index'
import HomeScreen from './pages/D3/HomeScreen'

import SelectSchool from './pages/selectSchool/SelectSchool'
import LinearGraph from './pages/Bea/LinearGraph'
import ChordsDiagram from './pages/ChordDiagram/ChordDiagram'
import About from './pages/About/About'
const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={HomeScreen} />
      <Route exact path ='/seeOrg' component={D3Index} />
      <Route exact path ='/about' component={About} />
      <Route path='/chords' component={ChordsDiagram} />
      <Route path='/home' component={Home} />
      <Route path='/selectschool' component={SelectSchool} />
      <Route path='/bea' component={LinearGraph} />
    </Switch>
  )
}

export default Router

import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './pages/home/Home'
import D3Index from './pages/D3/D3Index'
import SelectSchool from './pages/selectSchool/SelectSchool'

const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={D3Index} />
      <Route path='/home' component={Home} />
      <Route path='/selectschool' component={SelectSchool} />
    </Switch>
  )
}

export default Router

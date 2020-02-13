import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './pages/home/Home'
import D3Index from './pages/D3/D3Index'
import LinearGraph from './pages/beaTest/LinearGraph'

const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={D3Index} />
      <Route path='/home' component={Home} />
      <Route path='/bea' component={LinearGraph} />
    </Switch>
  )
}

export default Router

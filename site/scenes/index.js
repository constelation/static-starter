import React from 'react'

import { Route, IndexRoute } from 'react-router'
import App from './App'
import Home from './Home'
import Other from './Other'
import NotFound from './NotFound'

export default (
  <Route component={App}>
    <Route path='/' >
      <IndexRoute component={Home} />
      <Route path='other' component={Other} />
    </Route>
    <Route path='*' component={NotFound} />
  </Route>
)

// @flow
// Imports {{{

import IndexRoute from 'react-router/lib/IndexRoute'
import React from 'react'
import Route from 'react-router/lib/Route'

import App from './App'
import Home from './Home'
import NotFound from './NotFound'
import Other from './Other'

// }}}

// Note: be sure to update webpack.config.js's paths array with route changes
export default (
  <Route component={App}>
    <Route path='/'>
      <IndexRoute component={Home} />
      <Route
        path='other'
        component={Other}
      />
    </Route>
    <Route
      path='*'
      component={NotFound}
    />
  </Route>
)


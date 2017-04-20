// Imports {{{

import IndexRoute from 'react-router/lib/IndexRoute'
import React from 'react'
import Route from 'react-router/lib/Route'

import App from './App'

// }}}

function loadRoute(cb) {
  return module => cb(null, module.default)
}

function errorLoading(err) {
  console.error('Dynamic page loading failed', err)
}

const Home = (location, cb) => {
  import('./Home').then(loadRoute(cb)).catch(errorLoading)
}
const Other = (location, cb) => {
  import('./Other').then(loadRoute(cb)).catch(errorLoading)
}
const NotFound = (location, cb) => {
  import('./NotFound').then(loadRoute(cb)).catch(errorLoading)
}

// Note: be sure to update webpack.config.js's paths array with route changes
export default (
  <Route component={App}>
    <Route path='/'>
      <IndexRoute getComponent={Home} />
      <Route
        path='other'
        getComponent={Other}
      />
    </Route>
    <Route
      path='*'
      getComponent={NotFound}
    />
  </Route>
)


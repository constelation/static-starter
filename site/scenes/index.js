// @flow

import { Route, IndexRoute } from 'react-router'
import App from './App'
import Home from './Home'
import Other from './Other'
import NotFound from './NotFound'

// Note: be sure to update webpack.config.js's paths array with route changes
export default (
  <Route component={App}>
    <Route path='/' >
      <IndexRoute component={Home} />
      <Route path='other' component={Other} />
    </Route>
    <Route path='*' component={NotFound} />
  </Route>
)

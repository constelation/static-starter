// @flow
// Imports {{{

import { rehydrate } from 'glamor'
import { useScroll } from 'react-router-scroll'
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router/lib/Router'
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware'
import browserHistory from 'react-router/lib/browserHistory'
import match from 'react-router/lib/match'

import routes from './scenes/index.client'

// }}}

// Rehydrate glamor ids that were passed in from SSR
rehydrate(window._glam)

// match required for async rendering + SSR. Otherwise, there would be a flash of paint
match(
  { history: browserHistory, routes },
  (error, redirectLocation, renderProps) => {
    ReactDOM.render(
      <Router
        {...renderProps}
        render={applyRouterMiddleware(useScroll())}
      />,
      document.getElementById('root'),
    )
  },
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept()

  /*
   * Patch console.error to hide this bogus HMR/react-router warning
   * See https://github.com/gaearon/react-hot-loader/issues/298#issuecomment-236510239
   */
  const orgError = console.error // eslint-disable-line no-console
  //$FlowIgnore
  console.error = (...args) => {
    // eslint-disable-line no-console
    if (
      args &&
      args.length === 1 &&
      typeof args[0] === 'string' &&
      args[0].indexOf('You cannot change <Router routes>;') > -1
    ) {
      // React route changed
    }
    else {
      // Log the error as normally
      orgError.apply(console, args)
    }
  }
}


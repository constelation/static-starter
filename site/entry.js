// @flow
// Imports {{{

import { AppContainer } from 'react-hot-loader'
import {
  match,
  browserHistory,
  createMemoryHistory,
  applyRouterMiddleware,
  Router,
  RouterContext,
} from 'react-router'
import { rehydrate } from 'glamor'
import { renderStatic } from 'glamor/server'
import { useScroll } from 'react-router-scroll'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

import routes from './scenes'

// }}}

const render = (appRoutes) => {
  ReactDOM.render(
    <AppContainer>
      <Router
        history={browserHistory}
        routes={appRoutes}
        render={applyRouterMiddleware(useScroll())}
      />
    </AppContainer>,
    document.getElementById('root')
  )
}

// Client render (optional):
if (typeof document !== 'undefined') {
  rehydrate(window._glam)

  render(routes)

  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./scenes', () => {
      const hotRoutes = require('./scenes').default
      render(hotRoutes)
    });
  }
}

const globalStyles = `
  /* box-sizing reset */
  *, *:before, *:after {
    box-sizing: inherit;
  }
  html {
    box-sizing: border-box;
  }

  /* anti-aliasing */
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`


// Exported static site renderer:
export default (locals: Object, callback: Function) => {
  const history = createMemoryHistory()
  const location = history.createLocation(locals.path)

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const { html, css, ids } = renderStatic(() => ReactDOMServer.renderToStaticMarkup(
      <RouterContext {...renderProps} />
    ))

    callback( null, `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <!-- The above 3 meta tags *must* come first in the head, according to https://github.com/joshbuchea/HEAD; any other head content must come *after* these tags -->
          <title>Site Title</title>
          <style>${globalStyles}</style>
          <style>${css}</style>
        </head>
        <body>
          <div id="root">
            ${html}
          </div>

          <script>
            window._glam = ${JSON.stringify(ids)}
          </script>
          <script src="/bundle.js?t=${new Date().getTime()}"></script>
        </body>
      </html>
    `)
  })
}

// @flow

import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import useScroll from 'react-router-scroll'
import routes from './scenes'
import { renderStatic } from 'glamor/server'
import { rehydrate } from 'glamor'

import {
  match,
  browserHistory,
  createMemoryHistory,
  applyRouterMiddleware,
  Router,
  RouterContext,
} from 'react-router'

// Client render (optional):
if (typeof document !== 'undefined') {
  rehydrate(window._glam)

  ReactDOM.render(
    <Router
      history={browserHistory}
      routes={routes}
      render={applyRouterMiddleware(useScroll())}
    />,
    document.getElementById( 'root' )
  )
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
          <style>${globalStyles}</style>
          <style>${css}</style>
          <title>Site Title</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <meta http-equiv="content-type" content="text/html; charset=utf-8">
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
    `
  )})
}

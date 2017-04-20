// @flow
// Imports {{{

import { renderStatic } from 'glamor-server'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import RouterContext from 'react-router/lib/RouterContext'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import match from 'react-router/lib/match'

//$FlowIgnore
import htmlTemplate from './html.ejs'
import routes from './scenes/index.static'

// }}}

// Exported static site renderer:
export default (locals: Object, callback: Function) => {
  const history = createMemoryHistory()
  const location = history.createLocation(locals.path)

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const { html, css, ids } = renderStatic(() =>
      ReactDOMServer.renderToStaticMarkup(<RouterContext {...renderProps} />),
    )

    callback(
      null,
      htmlTemplate({
        css,
        html,
        title: 'Constelation',
        glamorIds: JSON.stringify(ids),
        js: [locals.assets.vendor, locals.assets.main],
        // js: Object.keys(locals.assets).map(key => locals.assets[key]),
      }),
    )
  })
}


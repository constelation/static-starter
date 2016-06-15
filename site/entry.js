import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import useScroll from 'react-router-scroll'
import routes from './scenes'

import {
  match,
  browserHistory,
  createMemoryHistory,
  applyRouterMiddleware,
  Router,
  RouterContext,
} from 'react-router'
import HtmlDocument from 'react-html-document'

const inlineStyles = `
  body {
    margin: 0px
  }
`

class Html extends React.Component {
  render() {
    return (
      <HtmlDocument
        title='Site Title'
        metatags={[
          {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'},
          {httpEquiv: 'content-type', content: 'text/html; charset=utf-8'},
        ]}
        scripts={[
          '/bundle.js',
        ]}
        stylesheets={[{inline: inlineStyles}]}
      >
        {this.props.children}
      </HtmlDocument>
    )
  }
}

// Client render (optional):
if (typeof document !== 'undefined') {
  ReactDOM.render(
    <Router
      history={browserHistory}
      routes={routes}
      render={applyRouterMiddleware(useScroll())}
    />,
    document.getElementById( 'app' ) // 'app' is default id of Html's wrapper
  )
}

// Exported static site renderer:
export default (locals, callback) => {
  const history = createMemoryHistory()
  const location = history.createLocation(locals.path)

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    // console.log(renderProps);
    callback( null, '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
      <Html location={location}>
        <RouterContext {...renderProps} />
      </Html>
    ))
  })

}

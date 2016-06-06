import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import routes from './scenes'

import { Router, RouterContext, match, browserHistory, createMemoryHistory } from 'react-router'
import HtmlDocument from 'react-html-document'

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
      >
        {this.props.children}
      </HtmlDocument>
    )
  }
}

class Hello extends React.Component {
  render() {
    return (
      <span>
        hi there
      </span>
    )
  }
}

// Client render (optional):
if (typeof document !== 'undefined') {
  ReactDOM.render( <Router history={browserHistory} routes={routes} />, document.getElementById( 'app' ) ) // 'app' is default id of Html's wrapper
}


// Exported static site renderer:
export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    // console.log(renderProps);
    callback( null, ReactDOMServer.renderToStaticMarkup(
      <Html location={location}>
        <RouterContext {...renderProps} />
      </Html>
    ))
  })

}

import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

import HtmlDocument from 'react-html-document'

const metatags = [
  {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'},
  {httpEquiv: 'content-type', content: 'text/html; charset=utf-8'},
]

class Html extends React.Component {
  render() {
    return (
      <HtmlDocument title='Site Title' metatags={metatags}>
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
  // Client render code goes here...
  ReactDOM.render( <Hello />, document.getElementById( 'app' ) ) // 'app' is default id of Html's wrapper
}

// Exported static site renderer:
export default function render( locals, callback ) {
  const html = ReactDOMServer.renderToStaticMarkup(
    <Html>
      <Hello />
    </Html>
  )

  callback( null, html )
}

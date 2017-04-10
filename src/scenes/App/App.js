// @flow
// Imports {{{

import 'glamor-reset'

import { Col, Row } from 'constelation-view'
import React from 'react'
import Text from 'constelation-text'

// }}}

export class AppBar extends React.Component {
  render() {
    return (
      <Row
        alignHorizontal='left'
      >
        <img src='http://www.fillmurray.com/64/64' />
      </Row>
    )
  }
}

export class TabBar extends React.Component {
  render() {
    return (
      <Row
        alignHorizontal='right'
      >
        <Text>One</Text>
        <Text>Two</Text>
        <Text>Three</Text>
      </Row>
    )
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Col
        fit
        alignVertical='top'
      >
        <AppBar />
        <TabBar />
        {this.props.children}
      </Col>
    )
  }
}

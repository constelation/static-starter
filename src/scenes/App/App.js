// @flow
// Imports {{{

import 'glamor-reset'

import { Col, Row } from 'constelation-view'
import { Provider } from 'mobx-react'
import React from 'react'
import Text from 'constelation-text'
import mobx from 'mobx'

import AppModal from 'stores/AppModal'

import Modal from './_/Modal'

// }}}

// -- MobX --
// throw an exception on any attempt to modify MobX state outside an action
mobx.useStrict(true)

// log all mobx actions when in development mode
if (process.env.NODE_ENV !== 'production') {
  mobx.spy(ev => {
    if (ev.type === 'action') {
      console.log(ev.name)
    }
  })
}

// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }

const stores = {
  AppModal: new AppModal(),
}

export class AppBar extends React.Component {
  render() {
    return (
      <Row alignHorizontal='left'>
        <img src='http://www.fillmurray.com/64/64' />
      </Row>
    )
  }
}

export class TabBar extends React.Component {
  render() {
    return (
      <Row alignHorizontal='right'>
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
      <Provider {...stores}>
        <Col
          fit
          alignVertical='top'
        >
          <AppBar />
          <TabBar />

          {this.props.children}

          <Modal />

        </Col>
      </Provider>
    )
  }
}

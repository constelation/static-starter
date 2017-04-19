// @flow
// Imports {{{

import { Col, View } from 'constelation-view'
import { bind } from 'decko'
import { inject, observer } from 'mobx-react'
import Event_ from 'constelation-event_'
import Link from 'react-router/lib/Link'
import React from 'react'
import Style_ from 'constelation-style_'
import Text from 'constelation-text'

import Dummy from './_/Dummy'

// }}}

@inject('AppModal')
@observer
export default class Home extends React.Component {
  @bind handleOpenModal() {
    this.props.AppModal.showModal(Dummy, { onClick: this.handleCloseModal })
  }

  @bind handleCloseModal() {
    this.props.AppModal.hideModal()
  }

  componentDidMount() {
    setTimeout(() => {this.handleOpenModal()}, 1000)
  }

  render() {
    return (
      <Col
        center
        grow
      >
        <Text size={20}>Home</Text>

        <Link to='other'>Other</Link>

        <Event_ onClick={this.handleOpenModal}>
          <Style_ border='1px solid #111'>
            <View padding={16}>
              <Text size={16}>Open Modal</Text>
            </View>
          </Style_>
        </Event_>
      </Col>
    )
  }
}


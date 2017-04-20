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
import DummyModal from './_/DummyModal'

// }}}

@inject('AppOverlay')
@observer
export default class Home extends React.Component {
  @bind handleOpenFadeOverlay() {
    this.props.AppOverlay.show(Dummy)
  }

  @bind handleOpenModal() {
    this.props.AppOverlay.show(DummyModal, {
      opacityColor: 'white',
      opacity: 0.5,
    })
  }

  @bind handleOpenModalDark() {
    this.props.AppOverlay.showModal(DummyModal, {
      opacityColor: '#111',
      opacity: 0.7,
    })
  }

  @bind handleCloseModal() {
    this.props.AppOverlay.hide()
  }

  render() {
    return (
      <Col
        center
        grow
      >
        <Text size={20}>Home</Text>

        <Link to='other'>Other</Link>

        <Event_ onClick={this.handleOpenFadeOverlay}>
          <Style_ border='1px solid #111'>
            <View padding={16}>
              <Text size={16}>Open Fade Overlay</Text>
            </View>
          </Style_>
        </Event_>

        <Event_ onClick={this.handleOpenModal}>
          <Style_ border='1px solid #111'>
            <View padding={16}>
              <Text size={16}>Open Overlay Light Outer</Text>
            </View>
          </Style_>
        </Event_>

        <Event_ onClick={this.handleOpenModalDark}>
          <Style_ border='1px solid #111'>
            <View padding={16}>
              <Text size={16}>Open Modal Dark Outer</Text>
            </View>
          </Style_>
        </Event_>
      </Col>
    )
  }
}


// @flow
// Imports {{{
import { View } from 'constelation-view'
import Animate_ from 'constelation-animate_'
import Event_ from 'constelation-event_'
import React from 'react'
import Style_ from 'constelation-style_'
import Text from 'constelation-text'

// }}}

export default class Dummy extends React.PureComponent {
  state = {
    opacity: 0,
  }

  componentDidEnter(cb) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        this.setState({ opacity: 1 })
      })
    })

  }

  componentWillLeave(cb) {
    this.node.addEventListener(
      'transitionend',
      () => {
        cb()
      },
      { once: true },
    )

    this.setState({ opacity: 0 })
  }

  render() {
    return (
      <Event_ onClick={this.props.onClose}>
        <Style_
          opacity={this.state.opacity}
          transition='opacity 1000ms ease-in-out'
        >
          <View
            grow
            refNode={node => {this.node = node}}
            position='fixed'
            top={0}
            right={0}
            bottom={0}
            left={0}
            zIndex={2}
            style={{ backgroundColor: 'red' }}
          >
            <Text>Oh HAI!</Text>
          </View>
        </Style_>
      </Event_>
    )
  }
}

// @flow
// Imports {{{
import { View } from 'constelation-view'
import Event_ from 'constelation-event_'
import React from 'react'
import Style_ from 'constelation-style_'
import Text from 'constelation-text'

// }}}

export default class FullOverlay extends React.PureComponent {
  node: HTMLElement

  state = {
    isVisible: false,
  }

  componentDidEnter() {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        this.setState({ isVisible: true })
      })
    })
  }

  componentWillLeave(cb: Function) {
    this.node.addEventListener(
      'transitionend',
      () => {
        cb()
      },
      { once: true },
    )

    this.setState({ isVisible: false })
  }

  setRef = (node : HTMLElement) => {
    this.node = node
  }

  render() {
    return (
      <Event_ onClick={this.props.onClose}>
        <Style_
          backgroundColor='red'
          opacity={this.state.isVisible ? 1 : 0}
          transition='opacity 1000ms ease-in-out'
        >
          <View
            refNode={this.setRef}
            zIndex={2}
            position='fixed'
            top={0}
            right={0}
            bottom={0}
            left={0}
          >
            <Text>Oh HAI!</Text>
          </View>
        </Style_>
      </Event_>
    )
  }
}

// @flow
// Imports {{{
import { View } from 'constelation-view'
import Event_ from 'constelation-event_'
import React from 'react'
import Style_ from 'constelation-style_'
import Text from 'constelation-text'

// }}}

export default class CenteredOverlay extends React.PureComponent {
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
          translateY={this.state.isVisible ? '0' : '100vh'}
          transition='transform 300ms ease-in-out'
        >
          <View
            refNode={this.setRef}
            zIndex={2}
            position='fixed'
            top={50}
            right={50}
            bottom={50}
            left={50}
          >
            <Text>Oh HAI!</Text>
          </View>
        </Style_>
      </Event_>
    )
  }
}

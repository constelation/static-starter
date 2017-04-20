// @flow
// Imports {{{
import { View } from 'constelation-view'
import Animate_ from 'constelation-animate_'
import Event_ from 'constelation-event_'
import React from 'react'
import Style_ from 'constelation-style_'
import Text from 'constelation-text'

// }}}

export default class DummyModal extends React.PureComponent {
  state = {
    isVisible: false,
  }

  componentDidEnter(cb) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        this.setState({ isVisible: true })
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

    this.setState({ isVisible: false })
  }

  setRef = node => {
    this.node = node
  }

  render() {
    return (
      <Style_
        opacity={this.state.isVisible ? 0.5 : 0}
        transition='opacity 300ms ease-in-out'
      >
        <View
          position='fixed'
          top={0}
          right={0}
          bottom={0}
          left={0}
          zIndex={1}
        >
          <Event_ onClick={this.props.onClick}>
            <Style_
              backgroundColor='red'
              translateY={this.state.isVisible ? '0' : '100vh'}
              transition='transform 300ms ease-in-out'
            >
              <View
                refNode={this.setRef}
                position='fixed'
                top={50}
                right={50}
                bottom={50}
                left={50}
                zIndex={2}
              >
                <Text>Oh HAI!</Text>
              </View>
            </Style_>
          </Event_>
        </View>
      </Style_>
    )
  }
}


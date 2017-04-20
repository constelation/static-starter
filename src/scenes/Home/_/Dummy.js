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
        // this.node.style.opacity = 1
        this.setState({ opacity: 1 })
      })
    })

    // window.requestAnimationFrame(() => {
    //   this.setState({ opacity: 1 })
    // })
  }

  componentWillLeave(cb) {
    this.node.addEventListener(
      'transitionend',
      () => {
        cb()
      },
      { once: true },
    )

    // window.requestAnimationFrame(() => {
      // this.node.style.opacity = 0
    // })

    // this.node.addEventListener(
    //   'animationend',
    //   () => {
    //     cb()
    //   },
    //   { once: true },
    // )

    // this.animate.trigger()
    // setTimeout(() => {cb()}, 1000)
    this.setState({ opacity: 0 })
  }

  render() {
    // return (
    //   <Event_ onClick={this.props.onClick}>
    //     <Animate_
    //       ref={animate => this.animate = animate}
    //       type='fadeIn'
    //       direction='alternate'
    //       duration='1000ms'
    //       easing='ease-in-out'
    //     >
    //       <Style_ backgroundColor='red'>
    //       <View
    //         grow
    //         refNode={node => this.node = node}
    //         position='fixed'
    //         top={0}
    //         right={0}
    //         bottom={0}
    //         left={0}
    //         zIndex={2}
    //         // style={{ backgroundColor: 'red' }}
    //       >
    //         <Text>Oh HAI!</Text>
    //       </View>
    //     </Style_>
    //     </Animate_>
    //   </Event_>
    // )
    return (
      <Event_ onClick={this.props.onClick}>
        <Style_
          // opacity={0}
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

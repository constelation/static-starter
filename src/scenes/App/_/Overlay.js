// @flow
// Imports {{{

import { bind } from 'decko'
import { inject, observer } from 'mobx-react'
import React from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'

// }}}

function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children)
  return childrenArray[0] || null
}

@inject('AppOverlay')
@observer
export default class Overlay extends React.Component {
  @bind handleClose() {
    this.props.AppOverlay.hide()
  }

  render() {
    const { Component, passProps } = this.props.AppOverlay.overlay

    return (
      <TransitionGroup component={FirstChild}>
        {
          Component !== null
            ? (
              <Component
                onClose={this.handleClose}
                {...passProps}
              />
            )
            : null
        }
      </TransitionGroup>
    )
  }
}


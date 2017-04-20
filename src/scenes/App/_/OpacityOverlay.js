// @flow
// Imports {{{

import { View } from 'constelation-view'
import { bind } from 'decko'
import { inject, observer } from 'mobx-react'
import Event_ from 'constelation-event_'
import React from 'react'
import Style_ from 'constelation-style_'

// }}}

@inject('AppOverlay')
@observer
export default class OpacityOverlay extends React.Component {
  @bind handleClick() {
    if (this.props.AppOverlay.isModal === true) {
      this.props.AppOverlay.hide()
    }
  }

  render() {
    const {
      isVisible,
      opacity,
      backgroundColor,
    } = this.props.AppOverlay.opacityOverlay

    return (
      <Event_ onClick={this.handleClick}>
        <Style_
          backgroundColor={backgroundColor}
          opacity={isVisible ? opacity : 0}
          transition='opacity 200ms ease-out'
        >
          <View
            zIndex={2}
            position='fixed'
            top={0}
            right={0}
            bottom={0}
            left={0}
            overflowY={isVisible && 'hidden'}
            pointerEvents={isVisible ? 'auto' : 'none'}
          />
        </Style_>
      </Event_>
    )
  }
}


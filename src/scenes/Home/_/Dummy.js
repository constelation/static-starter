// @flow
// Imports {{{
import { View } from 'constelation-view'
import Event_ from 'constelation-event_'
import React from 'react'
import Text from 'constelation-text'

// }}}

export default class Dummy extends React.Component {
  render() {
    return (
      <Event_ onClick={this.props.onClick}>
        <View
          grow
          // position='fixed'
          // top={0}
          // right={0}
          // bottom={0}
          // left={0}
          zIndex={2}
          style={{ backgroundColor: 'red' }}
        >
          <Text>Oh HAI!</Text>
        </View>
      </Event_>
    )
  }
}


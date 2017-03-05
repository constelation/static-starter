// @flow
// Imports {{{

import 'glamor-reset'

import { View } from 'constelation-view'
import React from 'react'

// }}}

export default class App extends React.Component {
  render() {
    return (
      <View>
        {this.props.children}
      </View>
    )
  }
}

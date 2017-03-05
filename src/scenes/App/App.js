// @flow
// Imports {{{

import 'glamor-reset'

import React from 'react'
import View from 'constelation-view'

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

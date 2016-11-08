// @flow

import React from 'react'
import 'glamor/reset'

export default class App extends React.Component {
  render() {
    return (
      <View>
        {this.props.children}
      </View>
    )
  }
}

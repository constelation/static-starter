// @flow
// Imports {{{

import Link from 'react-router/lib/Link'
import React from 'react'
import Style_ from 'constelation-style_'
import Text from 'constelation-text'
import View from 'constelation-view'

// }}}

export default class Home extends React.Component {
  render() {
    return (
      <Style_ backgroundColor='red'>
        <View center height={100} >
          <Text size={20}>Home</Text>
          <Link to='other'>Other</Link>
        </View>
      </Style_>
    )
  }
}

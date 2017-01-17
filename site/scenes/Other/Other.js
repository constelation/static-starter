// @flow
// Imports {{{

import Link from 'react-router/lib/Link'
import React from 'react'
import Text from 'constelation-Text'
import View from 'constelation-View'

// }}}

export default class Other extends React.Component {
  render() {
    return (
      <View>
        <Text>Other</Text>

        <Link to='/'>Home</Link>
      </View>
    )
  }
}

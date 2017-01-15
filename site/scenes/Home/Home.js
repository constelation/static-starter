// @flow
// Imports {{{

import { Link } from 'react-router'
import React from 'react'
import Style_ from 'constelation-Style_'
import Text from 'constelation-Text'
import View from 'constelation-View'

// }}}

export default class Home extends React.Component {
  render() {
    console.log('hi');
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

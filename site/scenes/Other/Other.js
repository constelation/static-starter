// @flow

import React from 'react'
import { Link } from 'react-router'

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

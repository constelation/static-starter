// @flow

import React from 'react'
import { Link } from 'react-router'

export default class Home extends React.Component {
  render() {
    return (
      <Style_ backgroundColor='red'>
        <View alignVertical='center' alignHorizontal='center' height={100}>
          <Text size={20}>Home</Text>
          <Link to='other'>Other</Link>
        </View>
      </Style_>
    )
  }
}

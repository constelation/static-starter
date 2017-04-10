// @flow
// Imports {{{

import { Col } from 'constelation-view'
import Link from 'react-router/lib/Link'
import React from 'react'
import Text from 'constelation-text'

// }}}

export default class Home extends React.Component {
  render() {
    return (
      <Col
        center
        grow
      >
        <Text size={20}>Home</Text>
        <Link to='other'>Other</Link>
      </Col>
    )
  }
}

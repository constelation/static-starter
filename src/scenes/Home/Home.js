// @flow
// Imports {{{

import { Col } from 'constelation-view'
import Link from 'react-router/lib/Link'
import React from 'react'
import Style_ from 'constelation-style_'
import Text from 'constelation-text'

// }}}

export default class Home extends React.Component {
  render() {
    return (
      <Style_ backgroundColor='red'>
        <Col
          center
          height={100}
        >
          <Text size={20}>Home</Text>
          <Link to='other'>Other</Link>
        </Col>
      </Style_>
    )
  }
}

// @flow
// Imports {{{

import { Col } from 'constelation-view'
import Link from 'react-router/lib/Link'
import React from 'react'
import Text from 'constelation-text'

// }}}

export default class Other extends React.Component {
  render() {
    return (
      <Col>
        <Text>Other</Text>

        <Link to='/'>Home</Link>

        <img src='http://www.fillmurray.com/64/64' />
      </Col>
    )
  }
}


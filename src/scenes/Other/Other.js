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

        <space size='40px' />

        <Link to='/'>Home</Link>

        <space size='40px' />


        <img src='http://www.fillmurray.com/64/64' />
      </Col>
    )
  }
}


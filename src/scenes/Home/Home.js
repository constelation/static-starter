// @flow
// Imports {{{

import { Col } from 'constelation-view'
import Link from 'react-router/lib/Link'
import React from 'react'
import Text from 'constelation-text'

// }}}

class Cloning_ extends React.Component {
  // constructor() {
  //   super()
  //
  //   console.log('Cloning Constructor');
  // }
  //
  // componentDidMount() {
  //   console.log('Cloning Mount');
  // }

  render() {
    console.log('Cloning Render');

    const { children, ...propsToPass } = this.props
    const child = React.Children.only(children);

    console.log('passProps', propsToPass);
    // console.log('ChildProps: ', child.props)

    return React.cloneElement(child, propsToPass );
  }
}

class PureComponentWrapper extends React.PureComponent {
  render() {
    console.log('PureComponentWrapper Render');
    return (
      <div>{this.props.children}</div>
    )
  }
}

class WrappingWontUpdate extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    console.log('WrappingWontUpdate Render');
    return this.props.children
  }
}

class Wrapping extends React.Component {
  render() {
    console.log('Wrapping Render');
    return this.props.children
  }
}

class WontUpdate extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    console.log('WontUpdate Render');
    return (
      <div />
    )
  }
}

class Div extends React.Component {
  static defaultProps = {
    bye: 'bye'
  }

  state = {
    why: 'why'
  }

  constructor() {
    super()

    console.log('Div Constructor');
  }

  componentDidMount() {
    console.log('Div Mount');
  }

  render() {
    console.log('Div Render');

    return (
      <div>{this.props.children}</div>
    )
  }
}

class PureComponentWithChildren extends React.PureComponent {

  render() {
    console.log('PureComponentWithChildren Render');

    return (
      <PureComponentWrapper>
        <Div />
      </PureComponentWrapper>
    )
  }
}

class AutoUpdates extends React.Component {
  state = {}

  componentDidMount() {
    setTimeout(() => this.setState({hi: 'hi'}), 2000)
  }

  render() {
    console.log('AutoUpdates Render');
    return (
      <div>{this.props.children}</div>
    )
  }
}

// export default class Home extends React.Component {
//   render() {
//     return (
//       <AutoUpdates >
//         <Cloning_><div/></Cloning_>
//       </AutoUpdates>
//     )
//   }
// }

function createElement(label, component, props, children) {
  console.log(`${label} element`)

  return React.createElement(
    component,
    props,
    children
  )
}
export default class App extends React.Component {
  state = {}

  componentDidMount() {
    setTimeout(() => this.setState({hi: 'hi'}), 2000)
  }
  //
  // render() {
  //   return (
  //     createElement(
  //       'Cloning_',
  //       Cloning_,
  //       null,
  //       createElement(
  //         'Div',
  //         Div,
  //         { hi: 'hi' },
  //       ),
  //     )
  //   )
  // }

  render() {
    return (
      <div >
        <Cloning_ hi='hi'>
          <PureComponentWrapper />
        </Cloning_>

        {/* <Cloning_> */}
        {/*   <Div hi='hi' /> */}
        {/* </Cloning_> */}

        {/* <Cloning_ hi='bye'> */}
        {/*   <Div hi='hi' /> */}
        {/* </Cloning_> */}

        {/* <PureComponentWrapper> */}
          {/* <Div>{this.state.hi}</Div> */}
          {/* <WontUpdate /> */}
        {/* </PureComponentWrapper> */}

        {/* <Cloning_> */}
        {/*   <WontUpdate /> */}
        {/* </Cloning_> */}

        {/* <WrappingWontUpdate> */}
        {/*   <Div>{this.state.hi}</Div> */}
        {/* </WrappingWontUpdate> */}

        {/* <PureComponentWithChildren /> */}

      </div>
    )
  }
}

// export default class Home extends React.Component {
//   render() {
//     return (
//       <Col
//         center
//         grow
//       >
//         <Text size={20}>Home</Text>
//         <Link to='other'>Other</Link>
//       </Col>
//     )
//   }
// }

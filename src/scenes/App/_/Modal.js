// @flow
// Imports {{{

import { View } from 'constelation-view'
import { inject, observer } from 'mobx-react'
import React from 'react'
import TransitionGroupView from 'constelation-transition-group-view'
import TransitionGroup from 'react-transition-group/TransitionGroup'

// }}}

// const fadeInStyles = {
//   willAppear: {
//     opacity: 0,
//     transition: 'opacity 300ms ease',
//   },
//   appear: {
//     opacity: 1,
//   },
//   willEnter: {
//     opacity: 0,
//   },
//   enter: {
//     opacity: 1,
//     transition: 'opacity 300ms ease',
//   },
//   willLeave: {
//     opacity: 1,
//   },
//   leave: {
//     opacity: 0,
//     transition: 'opacity 300ms ease',
//   },
// }

function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}

@inject('AppModal')
@observer
export default class Modal extends React.Component {
  render() {
    const Component = this.props.AppModal.component

    return (
      <TransitionGroup component={FirstChild}>
        {Component !== null ? <Component {...this.props.AppModal.passProps} /> : null}
      </TransitionGroup>
    )
    // return (
    //   <TransitionGroupView
    //     // willEnter={{opacity: 0}}
    //     // enter={{opacity: 1, transition: "opacity 1000ms ease-in"}}
    //     // willLeave={{opacity: 1}}
    //     // leave={{opacity: 0, transition: "opacity 1000ms ease-in"}}
    //     {...fadeInStyles}
    //     appearDuration={1000}
    //     enterDuration={1000}
    //     leaveDuration={1000}
    //   >
    //     {
    //       Component !== null && (
    //         <View
    //           // position='fixed'
    //           // top={0}
    //           // right={0}
    //           // bottom={0}
    //           // left={0}
    //         >
    //           <Component {...this.props.AppModal.passProps} />
    //         </View>
    //       )
    //     }
    //     {#<{(| <View height="500px" style={{backgroundColor: "lightgrey", border: "1px solid black"}} /> |)}>#}
    //     {#<{(| <View height="500px" style={{backgroundColor: "lightgrey", border: "1px solid black"}} /> |)}>#}
    //     {#<{(| <View height="500px" style={{backgroundColor: "lightgrey", border: "1px solid black"}} /> |)}>#}
    //   </TransitionGroupView>
    // )

    // return (
    //   <TransitionGroupView
    //     {...fadeInStyles}
    //     // hidden={!this.props.AppModal.isVisible}
    //     appearDuration={1000}
    //     enterDuration={1000}
    //     leaveDuration={1000}
    //     position='fixed'
    //     top={0}
    //     right={0}
    //     bottom={0}
    //     left={0}
    //   >
    //     {
    //       Component !== null && (
    //         <Component {...this.props.AppModal.passProps} />
    //       )
    //     }
    //   </TransitionGroupView>
    // )
  }
}

// export default class ModalContainer extends React.Component {
//
//   handleClose = () => {
//     UIState.hideModal()
//   }
//
//   setIsModalOverlayLocked = (bool) => {
//     UIState.setIsModalOverlayLocked(bool)
//   }
//
//   preventOver
//
//   render() {
//     const Component = UIState.modal.component
//
//     // NOTE: using key to re-mount when Component type changes
//     return Component
//       ? <Modal key={Component.name} isVisible={UIState.modal.isVisible} Component={Component} passProps={UIState.modal.passProps} onClose={this.handleClose} setIsModalOverlayLocked={this.setIsModalOverlayLocked} />
//       : null
//   }
// }

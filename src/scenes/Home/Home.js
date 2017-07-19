// @flow
// Imports {{{
import { View } from 'constelation-view'
import { bind } from 'decko'
import { inject, observer } from 'mobx-react'
import Event_ from 'constelation-event_'
import Link from 'react-router/lib/Link'
import React from 'react'
import Style_ from 'constelation-style_'
import Text from 'constelation-text'
import { css, styled } from 'emotion'

import CenteredOverlay from './_/CenteredOverlay'
import FullOverlay from './_/FullOverlay'

// }}}


const col = css`
  name: COL;
  display: flex;
  flex-direction: column;
  position: relative;
  flex-shrink: 0;
  align-items: stretch;
`

const flex = css`
  display: flex;
  position: relative;
  flex-shrink: 0;
  align-items: stretch;
`

const row = css`
  display: flex;
  flex-direction: column;
  position: relative;
  flex-shrink: 0;
  align-items: stretch;
`

const center = css`
  align-items: center;
  justify-content: center;
`

const BOX = css`
  height: 200px;
  width: 400px;
  backgroundColor: red;
`

const BOX_UPDATED = css`
  composes: ${BOX};
  backgroundColor: green;
`

@inject('AppOverlay')
@observer
export default class Home extends React.Component {
  state = {
    isUpdated: false,
  }

  @bind handleOpenFadeOverlay() {
    this.props.AppOverlay.show(FullOverlay)
  }

  @bind handleOpenModal() {
    this.props.AppOverlay.show(CenteredOverlay, {
      opacityColor: 'white',
      opacity: 0.5,
    })
  }

  @bind handleOpenModalDark() {
    this.props.AppOverlay.showModal(CenteredOverlay, {
      opacityColor: '#111',
      opacity: 0.7,
    })
  }

  @bind handleCloseModal() {
    this.props.AppOverlay.hide()
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isUpdated: true })
    }, 400)
  }

  render() {
    const grow = 1
    const another = 0;

    return (
      <div
        // flex-grow: 1;
        css={`
          display: flex;
          flex-direction: column;
          position: relative;
          flex-shrink: ${another};
          align-items: center;
          justify-content: center;
          flex-grow: ${grow};
        `}
      >

        {/* <event_ */}
        {/*   onClick={this.handleClick} */}
        {/*   hitSlop={20} */}
        {/* > */}
        {/*   <style_ */}
        {/*     backgroundColor={['purple', 'pink']} */}
        {/*   > */}
        {/*     <view */}
        {/*       as='aside' */}
        {/*       width={200} */}
        {/*       height={['40px', '80px']} */}
        {/*       breakpoints={[200, 800]} */}
        {/*     /> */}
        {/*   </style_> */}
        {/* </event_> */}
        {/*  */}
        {/* <view */}
        {/*   as='aside' */}
        {/*   width={200} */}
        {/*   height={['40px', '80px']} */}
        {/*   backgroundColor={['purple', 'pink']} */}
        {/*   breakpoints={[200, 800]} */}
        {/*   onClick={this.handleClick} */}
        {/*   hitSlop={20} */}
        {/* /> */}
        {/*  */}
        {/* <view */}
        {/*   as='aside' */}
        {/*   width={200} */}
        {/*   height='40px' */}
        {/*   onClick={this.handleClick} */}
        {/*   style={` */}
        {/*     background-color: purple; */}
        {/*   `} */}
        {/* /> */}
        {/*  */}
        {/*  */}
        {/* <style_ */}
        {/*   backgroundColor='purple' */}
        {/* > */}
        {/*   <view */}
        {/*     as='aside' */}
        {/*     width={200} */}
        {/*     height='40px' */}
        {/*     // padding={20} */}
        {/*     css={` */}
        {/*       background-color: purple; */}
        {/*     `} */}
        {/*   /> */}
        {/* </style_> */}
        {/*  */}
        {/* <view */}
        {/*   as='aside' */}
        {/*   width={200} */}
        {/*   height={['40px', '80px']} */}
        {/*   breakpoints={[200, 800]} */}
        {/*   style={` */}
        {/*     background-color: purple; */}
        {/*   `} */}
        {/* /> */}

        <view
          as='nav'
          width={300}
          height='30px'
          // padding={20}
          css={`
            background-color: purple;
          `}
        />

        <div className={this.state.isUpdated ? BOX_UPDATED : BOX} />

        <div
          // backgroundColor: var(--main-bg-color);
          css={`
            height: 200px;
            width: 400px;
            background-color: ${this.state.isUpdated ? 'yellow' : 'blue'};
          `}
        />

        <span
          css={`
            font-size: 20px;
          `}
        >
          Home
        </span>

        <Link to='other'>Other</Link>

        <span
          onClick={this.handleOpenFadeOverlay}
          css={`
            font-size: 16px;
            padding: 16px;
            border: 1px solid #111;
          `}
        >
          Open Fade Overlay
        </span>

        <span
          onClick={this.handleOpenModal}
          css={`
            font-size: 16px;
            padding: 16px;
            border: 1px solid #111;
          `}
        >
          Open Overlay Light Outer
        </span>

        <span
          onClick={this.handleOpenModalDark}
          css={`
            font-size: 16px;
            padding: 16px;
            border: 1px solid #111;
          `}
        >
          Open Modal Dark Outer
        </span>
      </div>
    )
  }
}

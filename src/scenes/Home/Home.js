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
      <col
        center
        grow={grow}
        // flex-grow: 1;
      // flex-grow: 1;
      // flex-grow: ;
        // css={`
        //   display: flex;
        //   flex-direction: column;
        //   position: relative;
        //   flex-shrink: ${another};
        //   align-items: center;
        //   justify-content: center;
        //   ${true ? 'flex-grow: 1' : ''}
        // `}
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
          width='300px'
          height='30px'
          margin='20px'
          css={`
            background-color: purple;
          `}
        />

        <div className={this.state.isUpdated ? BOX_UPDATED : BOX} />

        <view
          height='200px'
          width='400px'
          // backgroundColor: var(--main-bg-color);
          css={`
            background-color: ${this.state.isUpdated ? 'yellow' : 'blue'};
          `}
        />

        <space size='40px' />

        <row
          height='200px'
          width='400px'
        >
          <view
            grow
            css={`
              background-color: red;
            `}
          />
          <view
            grow
            css={`
              background-color: green;
            `}
          />
          <space size='20px' />
          <view
            grow
            css={`
              background-color: blue;
            `}
          />
        </row>

        <space size='40px' />

        <flex
          direction={this.state.isUpdated ? 'column' : 'row'}
          height='200px'
          width='400px'
        >
          <view
            grow
            css={`
              background-color: red;
            `}
          />
          <view
            grow
            css={`
              background-color: green;
            `}
          />
          <view
            grow
            css={`
              background-color: blue;
            `}
          />
        </flex>

        <text size='20px'>
          Home
        </text>

        <Link to='other'>Other</Link>

        <text
          size='16px'
          onClick={this.handleOpenFadeOverlay}
          css={`
            padding: 16px;
            border: 1px solid #111;
          `}
        >
          Open Fade Overlay
        </text>

        <text
          size='16px'
          onClick={this.handleOpenModal}
          css={`
            padding: 16px;
            border: 1px solid #111;
          `}
        >
          Open Overlay Light Outer
        </text>

        <text
          size='16px'
          onClick={this.handleOpenModalDark}
          css={`
            padding: 16px;
            border: 1px solid #111;
          `}
        >
          Open Modal Dark Outer
        </text>
      </col>
    )
  }
}

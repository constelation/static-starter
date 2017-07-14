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

@inject('AppOverlay')
@observer
export default class Home extends React.Component {
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

  render() {
    const grow = 1

    return (
      <div
        // composes: ${col} ${center};
        css={`
          display: flex;
          flex-direction: column;
          position: relative;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          flex-grow: ${grow};
        `}
      >
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

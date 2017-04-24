import { action, autorun, observable } from 'mobx'
import { disableScroll, enableScroll } from 'constelation-dom'

export default class AppOverlay {
  @observable hasBlockedScrollEvents = false
  @observable isModal = false
  @observable.shallow overlay = {
    Component: null,
    passProps: null,
  }
  @observable opacityOverlay = {
    isVisible: false,
    opacity: null,
    backgroundColor: null,
  }

  constructor() {
    // Side effects
    autorun(
      () => {
        if (this.isModal === true) {
          document.body.classList.add('disableScroll')
        }
        else {
          document.body.classList.remove('disableScroll')
        }
      }
    )

    autorun(
      () => {
        if (this.hasBlockedScrollEvents === true) {
          disableScroll()
        }
        else {
          enableScroll()
        }
      }
    )
  }

  /*
   * Show overlay
   * Show opacityOverlay if config calls for it
   */
  @action show(Component = null, config) {
    this.overlay.Component = Component

    if (config !== undefined) {
      const { passProps, opacityColor, opacity } = config

      if (passProps !== undefined) {
        this.overlay.passProps = passProps
      }

      if (opacityColor || opacity) {
        this.opacityOverlay.isVisible = true
        this.opacityOverlay.backgroundColor = opacityColor
        this.opacityOverlay.opacity = opacity
      }
    }
  }

  /*
   * Lock scrolling (hence, "modal")
   * Show overlay
   */
  @action showModal(Component, config) {
    this.isModal = true

    if (config !== undefined && config.hasScrollableContent !== true) {
      this.hasBlockedScrollEvents = true
    }

    this.show(Component, config)
  }

  /*
   * Remove overlay
   * Unlock scrolling if it was a modal
   * Hide opacityOverlay if it was visible
   */
  @action hide() {
    this.overlay.passProps = null
    this.overlay.Component = null

    if (this.isModal) {
      this.isModal = false

      if (this.hasBlockedScrollEvents) {
        this.hasBlockedScrollEvents = false
      }
    }

    if (this.opacityOverlay.isVisible) {
      this.opacityOverlay.isVisible = false
    }
  }
}

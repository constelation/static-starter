import { observable, action } from 'mobx'

export default class AppOverlay {
  @observable isModal = false
  @observable overlay = {
    Component: null,
    passProps: null,
  }
  @observable opacityOverlay = {
    isVisible: false,
    opacity: null,
    backgroundColor: null,
  }

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

  @action showModal(Component, config) {
    this.isModal = true
    this.show(Component, config)
  }

  @action hide() {
    this.overlay.passProps = null
    this.overlay.Component = null
    this.isModal = false

    if (this.opacityOverlay.isVisible) {
      this.opacityOverlay.isVisible = false
    }
  }
}


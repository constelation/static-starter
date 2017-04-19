import { observable, action } from 'mobx'

export default class AppModal {
  @observable isVisible = false
  @observable component = null
  @observable passProps = null

  @action showModal(component = null, passProps) {
    this.isVisible = true
    this.passProps = passProps
    this.component = component
  }

  @action hideModal() {
    this.isVisible = false
    this.passProps = null
    this.component = null
  }

  // @action clearModal() {
  //   this.modal.passProps = null
  //   this.modal.component = null
  // }

}

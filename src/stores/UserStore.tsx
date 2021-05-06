import { makeObservable, action, observable } from "mobx"

class UserStore {
  @observable terms = false
  @observable age = false

  constructor() {
    makeObservable(this)
  }

  @action setTerms(bool) {
    this.terms = bool
  }

  @action setAge(bool) {
    this.age = bool
  }
}

export default new UserStore()

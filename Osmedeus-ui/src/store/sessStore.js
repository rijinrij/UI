import { observable, action, computed } from 'mobx';


class sessStore {
  // enable login bypass for now
  @observable isLogged = false;

  @action setisLogged = () => {
    this.isLogged = true
  }

  @computed get checkLogin() {
    return this.isLogged
  }

}


export default new sessStore();

import { observable, action, computed } from 'mobx';


class sessStore {
  // enable login bypass for now
  @observable isLogged = false;
  // @observable isLogged = true;

  @action setisLogged = () => {
    this.isLogged = true
  }

  @action setLogout = () => {
    this.isLogged = false;
    window.localStorage.clear();
  }

  @computed get checkLogin() {
    return this.isLogged;
  }

}


export default new sessStore();

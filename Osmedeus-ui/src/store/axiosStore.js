import { observable, action, computed } from 'mobx';
import axios from 'axios';

class Session {
    @observable instance = axios.create({
      baseURL: 'http://127.0.0.1:5000/api/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer foo'
      }
    });

  @action setJWT = (jwt) => {
    const token = "Bearer " + jwt;
    // console.log(token)
    this.instance.defaults.headers['Authorization'] = token
    // this.instance.defaults.headers.common.Authorization = token
    console.log(this.instance.defaults.headers)
  }

  @computed get checkLogin() {
    return this.isLogged
  }

}


export default new Session();

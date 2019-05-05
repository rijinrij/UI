import { observable, action, computed, autorun} from 'mobx';
import axios from 'axios';
import https from 'https'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
class Session {

  @observable url = 'http://127.0.0.1:5000';

  @observable instance = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/',
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer foo'
    }
  });

  constructor() {
    autorun(() => {
      let url = window.localStorage.getItem('url');
      if (!url) {
        url = window.location.origin;
      }
      this.url = url;
      this.instance.defaults.baseURL = url + "/api";

      // get the token
      const token = "Bearer " + window.localStorage.getItem('jwt');
      this.instance.defaults.headers['Authorization'] = token
    });
  }

  

  @action setJWT = (jwt) => {
    const token = "Bearer " + jwt;
    // console.log(token)
    this.instance.defaults.headers['Authorization'] = token
    window.localStorage.setItem('jwt', jwt);
    console.log(this.instance.defaults.headers)

  }

  @action setURL = (url) => {
    const origin = new URL(url).origin;
    
    this.url = origin;
    console.log(this.url)
    window.localStorage.setItem('url', origin);
    this.instance.defaults.baseURL = origin + "/api";
  }

  @computed get checkLogin() {
    return this.isLogged
  }

}


export default new Session();

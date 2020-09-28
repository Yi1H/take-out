import axios from 'axios'

//默认配置
axios.defaults.baseURL = 'https://elm.cangdu.org/';
axios.defaults.timeout = 5000;

export default class request {
  static get(url = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: data
      })
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
    })
  }
  static post(url = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, {
        params: data
      }, {
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      })
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
    })
  }
}

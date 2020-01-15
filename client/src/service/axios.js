/* eslint-disable standard/object-curly-even-spacing */
/* eslint-disable quotes */
/* eslint-disable camelcase */
import axios from 'axios'
import config from '../utils/system.config'
axios.defaults.timeout = 60000
axios.defaults.baseURL = config['service']
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"

export default {
  setAxiosGetPromise: (urlClient, params = {}) => {
    return axios.get(urlClient, { params: params, headers: {Pragma: 'no-cache'}}).then(response => {
      return response.data
    }).catch(err => {
      throw err
    })
  },

  setAxiosPostPromise: (urlClient, data) => {
    return axios.post(urlClient, data, { headers: {
      Pragma: 'no-cache'
    }}).then(response => {
      return response.data
    }).catch(err => {
      throw err
    })
  },

  // 更新全部
  setAxiosPutPromise: (url, data) => {
    return axios.put(url, data, { headers: {
      Pragma: 'no-cache'
    }}).then(response => {
      return response
    }).catch(err => {
      throw err
    })
  },

  // 删除
  setAxiosDeletePromise: (url, data) => {
    return axios.delete(url, data, { headers: {
      Pragma: 'no-cache'
    }}).then(response => {
      return response
    }).catch(err => {
      throw err
    })
  }
}

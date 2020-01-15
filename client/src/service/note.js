import axios from './axios.js'
const note = {
  loadNodeList: (query) => axios.setAxiosGetPromise('note/noteList')
}

export default note

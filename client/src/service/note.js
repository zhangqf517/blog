import axios from './axios.js'
const note = {
  loadNodeList: (query) => axios.setAxiosGetPromise('note/getNoteList'),
  getNodeByPath: (query) => axios.setAxiosGetPromise('note/getNoteByPath', query)
}

export default note

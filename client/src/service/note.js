import axios from './axios.js'
const note = {
  loadNodeList: (query) => axios.setAxiosGetPromise('note/getNoteList'),
  getNodeByPath: (query) => axios.setAxiosGetPromise('note/getNoteByPath', query),
  uploadNote: (query) => axios.setAxiosGetPromise('note/uploadNote', query),
  loadNoteType: (query) => axios.setAxiosGetPromise('note/loadNoteType', query),
  getNoteListByType: (query) => axios.setAxiosGetPromise('note/getNoteListByType', query)
}

export default note

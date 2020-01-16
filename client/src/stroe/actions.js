import noteService from '../service/note.js'

const actions = {
  async getNoteList ({ commit }, data) {
    let allList = await noteService.loadNodeList(data)
    return allList
  },
  async getNote ({ commit }, data) {
    let note = await noteService.getNodeByPath(data)
    return note
  }
}
export default actions

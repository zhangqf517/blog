import noteService from '../service/note.js'

const actions = {
  async getNoteList ({ commit }, data) {
    let allList = await noteService.loadNodeList(data)
    return allList
  },
  async getNote ({ commit }, data) {
    let note = await noteService.getNodeByPath(data)
    return note
  },
  async uploadNote ({commit}, data) {
    let results = await noteService.uploadNote(data)
    return results
  },
  async loadNoteType ({commit}, data) {
    let typeList = await noteService.loadNoteType(data)
    return typeList
  },
  async getNoteListByType ({commit}, data) {
    let typeList = await noteService.getNoteListByType(data)
    return typeList
  },
  async updata ({commit}, data) {
    let results = await noteService.updata(data)
    return results
  }
}
export default actions

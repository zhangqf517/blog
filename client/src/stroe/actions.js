import note from '../service/note.js'

const actions = {
  async getNoteList ({ commit }, data) {
    let allList = await note.loadNodeList(data)
    return allList
  }
}
export default actions

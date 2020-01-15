import noteService from '../services/notes'

export default {
    // 查询
    getNotes: async (params) => await noteService.getNotes(params)
}
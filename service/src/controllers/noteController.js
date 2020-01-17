import noteService from '../services/notes'

export default {
    // 查询
    getNotes: async (params) => await noteService.getNotes(params),
    getNoteByPath: async (params) => await noteService.getNoteByPath(params),
    uploadNoteByPath: async (params) => await noteService.uploadNoteByPath(params)
}
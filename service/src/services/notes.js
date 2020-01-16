import fs from 'fs'
import path from 'path'
import marked from 'marked'

export default {
    getNotes: async (params) => {
        let noteList = []
        let notePath = path.join(__dirname, '../../../blog')
        if (fs.readdirSync(notePath).length === 0) {
            return { success: true, msg: '您还没有写note或者目录错误！（请确保bolg文件夹与service为同级目录）' }
        }
        const pushToNoteList = (noteUrl, id) => {
            let noteDir = fs.readdirSync(noteUrl)
            let count = 0
            noteDir.forEach(filename => {
                let file = path.join(noteUrl, '/' + filename)
                if (fs.lstatSync(file).isDirectory()) {
                    noteList.push({ id: id + '-' + count, name: filename, pid: id, isDirectory: true })
                    const tdir = path.join(noteUrl, filename)
                    pushToNoteList(tdir, id + '-' + count)
                }else {
                    noteList.push({ id: id + '-' + count, name: filename, pid: id, isDirectory: false, path: file })
                }
                count++
            })
        }
        pushToNoteList(notePath, '0')
        // 逻辑部分
        return noteList
    },
    getNoteByPath: async (params) => {
        let note = await fs.readFileSync(params.path,'utf-8')
        note = marked(note.toString())
        // note = JSON.parse(note)
        return {success: true,data: note} 
    }
}
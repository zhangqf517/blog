import fs from 'fs'
import path from 'path'
import marked from 'marked'
import noteDBService from './noteDBService'
const moment = require('moment');

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
        console.log(params.path)
        let noteDB = await noteDBService.find({condition:{'iddd':'686'}}) 
        let note = await fs.readFileSync(params.path,'utf-8')
        // await noteDBService.save({
        //     iddd:'686',
        //     state:'正常',
        //     content:note
        // })
        note = marked(note.toString())
        return {success: true,data: note} 
    },
    uploadNoteByPath: async (params) => {
        try {
            let type = params.path.slice(params.path.lastIndexOf('\\blog\\blog')+11)
            type = type.slice(0, type.indexOf('\\'))
            let note = await fs.readFileSync(params.path,'utf-8')
            await noteDBService.save({
                path:params.path,
                type:type,
                content:note,
                lastUpdateTime:moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                name:params.path.slice(params.path.lastIndexOf('\\')+1)
            })
        } catch (error) {
            return {success: false,msg: '读取文件失败，请检查地址是否正确'}
        }
        return {success: true}
    },
    loadNoteType: async (params) => {
        try {
            let noteList = await noteDBService.find({})
            let typeList = []
            for (const item of noteList) {
                if(typeList.indexOf(item.type)){
                    typeList.push(item.type)
                }
            }
            typeList.sort()
            return {success: true,typeList}
        } catch (error) {
            return {success: false,msg: 'error'}
        }
        return {success: true}
    },
    getNoteListByType: async (params) => {
        console.log(params.path)
        let noteDB = await noteDBService.find({condition:{'type': params.type}}) 
        return {success: true,data: noteDB} 
    }
}
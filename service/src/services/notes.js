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
        } else {
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
    let noteDB = await noteDBService.find({ condition: { 'path': params.path } })
    let note = marked(noteDB[0].content.toString())
    return { success: true, data: note }
  },
  uploadNoteByPath: async (params) => {
    try {
      let noteDB = await noteDBService.find({ condition: { 'path': params.path } })
      if (noteDB) {
        return { success: false, msg: '该文件已上传！' }
      }
      let type = params.path.slice(params.path.lastIndexOf('\\blog\\blog') + 11)
      type = type.slice(0, type.indexOf('\\'))
      let note = await fs.readFileSync(params.path, 'utf-8')
      await noteDBService.save({
        path: params.path,
        type: type,
        content: note,
        lastUpdateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        name: params.path.slice(params.path.lastIndexOf('\\') + 1)
      })
    } catch (error) {
      return { success: false, msg: '读取文件失败，请检查地址是否正确' }
    }
    return { success: true }
  },
  loadNoteType: async (params) => {
    try {
      let noteList = await noteDBService.find({})
      let typeList = []
      for (const item of noteList) {
        if (typeList.indexOf(item.type) === -1) {
          typeList.push(item.type)
        }
      }
      typeList.sort()
      return { success: true, typeList }
    } catch (error) {
      return { success: false, msg: 'error' }
    }
    return { success: true }
  },
  getNoteListByType: async (params) => {
    let noteDB = await noteDBService.find({ condition: { 'type': params.type } })
    return { success: true, data: noteDB }
  },
  updataNote: async (params) => {
    // count保存此次更新note个数
    let count = 0
    let root = 'F:\\blog\\blog'
    let res = fs.readdirSync(root)
    for (const f of res) {
      let filePath = root + '\\' + f
      let file = fs.readdirSync(filePath)
      if (file.length !== 0) {
        // 遍历所有文件查找是否存在没有添加到数据库中的
        for (const item of file) {
          let notePath = filePath + '\\' + item
          await noteDBService.find({ condition: { 'path': notePath } }).then(res => {
            if (res.length === 0) {
              let type = notePath.slice(notePath.lastIndexOf('\\blog\\blog') + 11)
              type = type.slice(0, type.indexOf('\\'))
              let note = fs.readFileSync(notePath, 'utf-8')
              noteDBService.save({
                path: notePath,
                type: type,
                content: note,
                lastUpdateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                name: notePath.slice(notePath.lastIndexOf('\\') + 1)
              })
              count++
            }
          })
        }
      }
    }
    return { success: true, msg: `检查更新完毕，此次共添加 ${count} 个文件` }
  }
}
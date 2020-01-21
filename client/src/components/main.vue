<template>
  <div>
    <el-button class="backfile" @click="backFile()">返回</el-button>
    <el-input v-model="uploadFilePath" style="width:400px;"></el-input>
    <el-button class="backfile" @click="upload()">写博客</el-button>
    <el-button class="backfile" @click="check_up()">检查更新</el-button>
    <div class="eachNote" v-for="item in currentFiles" v-bind:key="item.id" @click="clickFile(item)" v-show="isCatalog">
      {{item.name}}
    </div>
    <div v-show="!isCatalog" v-html="content"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
export default {
  name: 'Note',
  data () {
    return {
      notelist: [], // 存储所有文件
      currentFileId: '', // 当前页面文件ID
      currentFiles: [], // 存储当前展示文件
      isCatalog: true, // 当前是否显示目录
      content: '', // 存储当前文件内容
      uploadFilePath: '', // 上传的note地址
      currentType: [] // 存储当前类型
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions(['getNoteList', 'getNote', 'uploadNote', 'loadNoteType', 'getNoteListByType', 'updata']),
    // 获得日志列表
    loadNoteList () {
      this.getNoteList().then(res => {
        res.forEach(file => {
          console.log(file)
          this.notelist.push(file)
          if (file.pid === '0') {
            this.currentFiles.push(file)
          }
        })
      })
    },
    clickFile (file) {
      this.currentFileId = file.id
      if (file.isDirectory) {
        this.isCatalog = true
        this.currentFiles = []
        this.notelist.forEach(filename => {
          if (filename.pid === file.id) {
            this.currentFiles.push(filename)
          }
        })
      } else {
        this.getNote({path: file.path}).then(res => {
          if (res.success === true) {
            this.content = res.data
            this.$nextTick(() => {
              let blocks = document.querySelectorAll('pre code')
              blocks.forEach(block => {
                hljs.highlightBlock(block)
              })
            })
            this.isCatalog = false
          }
        })
      }
    },
    backFile () {
      this.isCatalog = true
      if (this.notelist.find(s => s.id === this.currentFileId)) {
        let pid = this.notelist.find(s => s.id === this.currentFileId).pid
        this.currentFiles = []
        this.notelist.forEach(filename => {
          if (filename.pid === pid) {
            this.currentFiles.push(filename)
          }
        })
        this.currentFileId = this.currentFiles[0].pid
      }
    },
    // 上传文件
    upload () {
      if (this.uploadFilePath === '' || this.uploadFileType === '') {
        alert('地址或类型不能为空！')
        return
      }
      this.uploadNote({path: this.uploadFilePath}).then(res => {
        if (res.success) {
          alert('上传成功')
          this.changeType(this.currentType)
        } else {
          alert(res.msg ? res.msg : '上传失败！')
        }
      })
    },
    changeType (type) {
      this.isCatalog = true
      this.currentType = type
      this.getNoteListByType({type: type}).then(res => {
        this.currentFiles = res.data
      })
    },
    check_up () {
      this.updata().then(res => {
        console.log(res)
        alert(res.msg)
      })
    }

  }
}
</script>

<style scoped>
  .eachNote{
    border-bottom: 1px solid rgb(155, 104, 104);
    color: rgb(103, 110, 119);
    height: 50px;
    margin-top: 10px;
    /* display:inline-block; */
  }
  .eachNote:hover{
    color: rgb(59, 52, 52);
    /* font-weight: 600; */
    cursor: pointer;
  }
</style>

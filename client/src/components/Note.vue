<template>
  <div>
    <div v-for="item in currentFiles" v-bind:key="item.id" @click="clickFile(item)">
      {{item.name}}
    </div>
    <el-button class="backfile" @click="backFile()">返回</el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Note',
  data () {
    return {
      notelist: [], // 存储所有文件
      currentFileId: '', // 当前页面文件ID
      currentFiles: [] // 存储当前展示文件
    }
  },
  mounted () {
    this.loadNoteList()
  },
  methods: {
    ...mapActions(['getNoteList']),
    // 获得日志列表
    loadNoteList () {
      this.getNoteList().then(res => {
        res.forEach(file => {
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
        this.currentFiles = []
        this.notelist.forEach(filename => {
          if (filename.pid === file.id) {
            this.currentFiles.push(filename)
          }
        })
      }
    },
    backFile () {
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
    }
  }
}
</script>

<style>
</style>

<template>
  <div class="main">
    <div class="profile">
      <div class="personBlog">个人博客</div>
    </div>
    <div class="menulist">
      <div class="typelist" v-for="item in typeList" v-bind:key="item" @click="changeType(item)">
        <div class="type">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      typeList: [],
      currType: ''
    }
  },
  watch: {
  },
  computed: {
    defaultActive () {
      return '0'
    }
  },
  mounted () {
    this.loadNotesType()
  },
  methods: {
    ...mapActions(['loadNoteType', 'getNoteListByType']),
    // 加载note类型
    loadNotesType () {
      this.loadNoteType().then(res => {
        console.log(res.typeList)
        if (res.typeList.length === 0) {
          return
        }
        for (const item of res.typeList) {
          this.typeList.push(item)
        }
        this.changeType(this.typeList[0])
      })
    },
    changeType (type) {
      this.$emit('changeType', type)
    }
  }
}
</script>

<style>
  li{list-style: none}
  a{
    text-decoration:none;
    color: black;
  }
</style>

<style scoped>
  .main{
    /* background-color: rgb(230, 188, 188); */
  }
  .profile{
    margin: 20px auto;
    height: 100px;
  }
  .personBlog{
    font-weight: 600;
    font-size: 30px;
  }
  .menulist{
    display:flex;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    height: 40px;
  }
  .typelist{
    width: 100px;
    margin: 10px;
  }
  .type{
    width: 100px;
    text-align: center;
    color: rgb(134, 131, 119);
    /* background-color: white;
    border: 1px solid yellow; */
  }
  .type:hover{
    color: rgb(68, 50, 50);
    font-weight: 600;
    cursor: pointer;
  }
</style>

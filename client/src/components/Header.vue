<template>
  <div class="main">
    <div class="profile">
      <router-link to="/home">
        <img src='../assets/photo.jpg'>
      </router-link>
    </div>
    <div class="site-identify">
      <h4>zqf</h4>
    </div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item :index="menuList[0].path" @click="routeTo(menuList[0].path)">
        <i class="el-icon-menu"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-menu-item :index="menuList[1].path" @click="routeTo(menuList[1].path)">
        <i class="el-icon-menu"></i>
        <span slot="title">日志</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      circleUrl: '../assets/photo.jpg',
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png==========',
      size: 200,
      menuList: [
        {
          id: '0',
          title: '主页',
          path: '/home',
          icon: 'el-icon-location',
          pid: '0000'
        },
        {
          id: '4',
          title: '日志',
          path: '/note',
          icon: 'el-icon-location',
          pid: '0000'
        }
      ],
      currMenu: '0'
    }
  },
  watch: {
    currMenu: function (newVal, oldVal) {
      console.log('-----------old,new----------')
    }
  },
  computed: {
    defaultActive () {
      return '0'
    }
  },
  mounted () {
  },
  methods: {
    routeTo (path) {
      this.$router.push(path)
      console.log(path)
      // let hasSubMenu = path.indexOf('-')
      // if (hasSubMenu !== -1) {
      //   this.currMenu = this.menuList[path.slice(0, path.indexOf('-'))].subMenu[path.slice(path.indexOf('-') + 1)]
      // } else {
      //   this.currMenu = this.menuList[path]
      // }
      // alert(path);
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
    background-color: rgb(73, 71, 71);
  }
  .profile{
    margin: 20px auto;
  }
  .profile img{
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
  .site-identify{
    text-align: center;
  }
  .mainMenu{
    text-align: center;
    height: 50px;
    padding: 0 20px;
  }
</style>

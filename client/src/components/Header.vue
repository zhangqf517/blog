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
      <el-submenu :index='menuList[1].path'>
        <template slot="title" index="menuList[0].path" @click="routeTo(menuList[1].path)">
          <i class="el-icon-location"></i>
          <span>关于</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="menuList[2].path" @click="routeTo(menuList[2].path)">关于作者</el-menu-item>
          <el-menu-item :index="menuList[3].path" @click="routeTo(menuList[3].path)">关于博客</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :index="menuList[4].path" @click="routeTo(menuList[4].path)">
        <i class="el-icon-menu"></i>
        <span slot="title">日志</span>
      </el-menu-item>
      <el-menu-item :index="menuList[5].path" @click="routeTo(menuList[5].path)">
        <i class="el-icon-document"></i>
        <span slot="title">设置</span>
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
          id: '1',
          title: '关于',
          path: '/about',
          icon: 'el-icon-location',
          pid: '0000'
        },
        {
          id: '2',
          title: '关于作者',
          icon: 'el-icon-location',
          path: '/aboutAuthor',
          pid: '1'
        },
        {
          id: '3',
          title: '关于博客',
          icon: 'el-icon-location',
          path: '/aboutBlog',
          pid: '1'
        },
        {
          id: '4',
          title: '日志',
          path: '/note',
          icon: 'el-icon-location',
          pid: '0000'
        },
        {
          id: '5',
          title: '设置',
          path: '/set',
          icon: 'el-icon-setting',
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

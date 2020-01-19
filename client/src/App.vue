<template>
  <div id="app">
    <div class="whitePaper">
      <router-view name='header' class="header" @changeType='changeType'></router-view>
      <router-view name='main' class="content" ref="contents"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    changeType (type) {
      this.$refs.contents.changeType(type)
    }
  }
}
</script>

<style>
#app{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgb(226, 230, 220);
}
.header{
  box-sizing: border-box;
  padding: 10px 25px;
  margin: 0px auto;
  margin-top: 40px;
  height: 200px;
  max-width: 1200px;
  border: 1px solid red;
}
.content{
  padding: 10px 25px;
  box-sizing: border-box;
  margin: 0px auto;
  min-height: calc(100% - 240px);
  max-width: 1200px;
  border: 1px solid red;
}
.whitePaper {
    position: absolute;
    background-color: whitesmoke;
    top: 50px;
    left: 100px;
    right: 100px;
    bottom: 0px;
}

</style>

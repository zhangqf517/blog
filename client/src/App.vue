<template>
  <div id="app">
    <router-view name='header' class="header"></router-view>
    <router-view name='main' class="content"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.header{
  height: 100%;
  width: 300px;
  float: left;
}
.content{
  float: right;
  height: 100%;
  width: calc(100% - 300px);
}

</style>

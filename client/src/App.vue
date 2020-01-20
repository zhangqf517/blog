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
  width: 100%;
  min-height: 100%;
  padding-top: 40px;
  padding-bottom: 40px;
}
.whitePaper {
  box-sizing: border-box;
  margin: 0px 100px;
  background-color: whitesmoke;
  min-height: 640px;
}
.header{
  box-sizing: border-box;
  padding: 10px 25px;
  margin: 0px auto;
  height: 200px;
  max-width: 1200px;
  /* border: 1px solid red; */
}
.content{
  padding: 10px 25px;
  box-sizing: border-box;
  margin: 0px auto;
  min-height: calc(100% - 240px);
  max-width: 1200px;
  /* border: 1px solid red; */
}

</style>

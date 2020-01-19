import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/Header.vue'
import main from '@/components/main.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      components: {
        header: Header,
        main: main
      }
    }
  ]
})

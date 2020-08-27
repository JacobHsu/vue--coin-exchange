import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/exchange',
      component: resolve => require(['../pages/exchange/exchange'], resolve)
    },
    {
      path: '/exchange/:pair',
      component: resolve => require(['../pages/exchange/exchange'], resolve),
      name: 'ExchangePair'
    }
  ]
})

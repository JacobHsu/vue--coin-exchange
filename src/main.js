// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import router from './router'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(VueI18n)

iView.LoadingBar.config({
  color: '#F90',
  failedColor: '#f0ad4e',
  height: 2
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
  iView.LoadingBar.finish()
})

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    zh: require('./assets/lang/zh.js'),
    en: require('./assets/lang/en.js')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})

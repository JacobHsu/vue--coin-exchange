// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import router from './router'
import store from './store'
import vueResource from 'vue-resource'
import Api from './config/api'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(VueI18n)
Vue.use(vueResource)

Vue.prototype.host = 'http://49.234.13.106:8801' // "https://api.xxxx.com"

Vue.prototype.api = Api

Vue.http.options.credentials = true
Vue.http.options.emulateJSON = true
Vue.http.options.headers = {
  // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  'Content-Type': 'application/json;charset=utf-8'
}

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
  store,
  components: { App },
  template: '<App/>'
})

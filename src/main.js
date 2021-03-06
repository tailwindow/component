import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/css/tailwind.css'
import TextTransform from '@/filters/text-transform'
import TextTransformPrototype from '@/plugins/text-transform'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_GTAG_ID }
}, router)

Vue.use(TextTransform)
Vue.use(TextTransformPrototype)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import StatusComponets from "./status"

//Vue.component("컴포넌트명", 옵션)
Vue.component("AppStatus", StatusComponets)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

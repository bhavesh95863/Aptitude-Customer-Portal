import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import { router } from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import VueFormJsonSchema from "vue-form-json-schema";

Vue.use(Vuetify);
Vue.use(VueCookies)
Vue.use(VueFormJsonSchema);
Vue.config.productionTip = false

new Vue({
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi',
    }
  }),
  router,
  store,
  render: h => h(App),
}).$mount('#app')


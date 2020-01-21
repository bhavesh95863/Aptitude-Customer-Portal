import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { router } from './router'
import store from './store'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import VueFormGenerator from "vue-form-generator";
Vue.use(VueFormGenerator);
import VueFormJsonSchema from "vue-form-json-schema";
Vue.use(VueFormJsonSchema);
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')

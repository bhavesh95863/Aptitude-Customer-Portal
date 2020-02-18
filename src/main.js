import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import { router } from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import VueFormJsonSchema from "vue-form-json-schema";


import { initVeeValidate } from "@/components/appscode/plugins/vee-validate";
initVeeValidate();

import VTooltip from "v-tooltip";
Vue.use(VTooltip);

// global components
import VueOpenapiForm from "@/components/appscode/components/VueOpenapiForm";
import ObjectForm from "@/components/appscode/components/ObjectForm";
import ObjectFormWrapper from "@/components/appscode/components/ObjectFormWrapper";
import ArrayInput from "@/components/appscode/components/ArrayInput";
import KeyValuePairs from "@/components/appscode/components/KeyValuePairs";
import SimpleInput from "@/components/appscode/components/SimpleInput";

Vue.component("vue-openapi-form", VueOpenapiForm);
Vue.component("object-form", ObjectForm);
Vue.component("object-form-wrapper", ObjectFormWrapper);
Vue.component("array-input", ArrayInput);
Vue.component("key-value-pairs", KeyValuePairs);
Vue.component("simple-input", SimpleInput);



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


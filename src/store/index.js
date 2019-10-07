import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/user.module'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    login
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.module'
import alert from './modules/alert.module'
import header from './modules/header.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    user,
    alert,
    header
  }
})

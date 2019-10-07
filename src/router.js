import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import LoginPage from './views/LoginPage.vue'
import AboutPage from './views/AboutPage.vue'
// import RegisterPage from './views/RegisterPage.vue'

Vue.use(Router)


export default new Router({
  // mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/about', component: AboutPage },
    // { path: '/register', component: RegisterPage },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

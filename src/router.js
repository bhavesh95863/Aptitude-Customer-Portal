import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import LoginPage from './views/LoginPage.vue'
import AboutPage from './views/AboutPage.vue'
import RegisterPage from './views/RegisterPage.vue'
import CompanyProfilePage from './views/CompanyProfilePage.vue'
import FinancePage from './views/FinancePage.vue'
import ProfileSettingPage from './views/ProfileSettingPage.vue'
import store from './store'
Vue.use(Router)


export const router = new Router({
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/about', component: AboutPage },
    { path: '/register', component: RegisterPage },
    { path: '/company-profile', component: CompanyProfilePage },
    { path: '/finance', component: FinancePage },
    { path: '/profile-setting', component: ProfileSettingPage },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.onReady(() => {
  store.dispatch('getUsername');
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/about', '/login', '/register'];
  const loginPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters.getLoggedIn;
  // alert(loggedInSid);
  // store.dispatch('getUsername');
  if (authRequired && !loggedIn) {
    return next('/login');
  } else if (loginPages.includes(to.path) && loggedIn) {
    return next('/');
  }

  next();
})
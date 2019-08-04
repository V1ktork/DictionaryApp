import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import PageNotFound from '@/views/E404.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user/signup',
      name: 'signup',
      component: () =>
        import(/* webpackChunkName: "signup" */ '@/views/Signup.vue')
    },
    {
      path: '/user/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/Login.vue')
    },
    {
      path: '/dictionary',
      name: 'dictionary',
      component: () =>
        import(
          /* webpackChunkName: "dictionary" */ '@/components/Dictionary.vue'
        )
    },
    {
      path: '*',
      name: 'pageNotFound',
      component: PageNotFound
    }
  ]
});

import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        allowHeader: true
      }
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
        ),
      meta: {
        allowHeader: true
      },
      beforeEnter(from, to, next) {
        if (store.getters['users/authenticated']) {
          if (!store.state.dictionary.loaded) {
            store.dispatch('dictionary/fetchAllWords');
          }
          next();
        } else {
          store.commit(
            'setErrorMsg',
            'Вы не авторизованы для доступа к этой странице.'
          );
          next({ name: 'home' });
        }
      }
    },
    {
      path: '*',
      name: 'pageNotFound',
      component: () =>
        import(/* webpackChunkName: "page-not-found" */ '@/views/E404.vue')
    }
  ]
});

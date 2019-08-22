import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '../store/store';
import axios from 'axios';
import Vuelidate from 'vuelidate';

import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(Vuelidate);

axios.defaults.baseURL = 'http://localhost:3000';

axios.interceptors.request.use(
  config => {
    let token = store.state.users.userToken;
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject({
        message:
          'При выполнении запроса возникла ошибка. Пожалуйста, повторите позже.'
      });
    } else {
      return Promise.reject({
        message: 'На сервере произошла ошибка. Пожалуйста, повторите позже.'
      });
    }
  }
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

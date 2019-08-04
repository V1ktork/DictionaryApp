import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '../store/store';
import axios from 'axios';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:3000';

if (store.state.userToken) {
  axios.defaults.headers.common['Authorization'] = store.state.userToken;
}

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

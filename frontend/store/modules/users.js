import axios from 'axios';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    userToken: localStorage.getItem('token') || null
  },
  mutations: {
    login(state, token) {
      state.userToken = token;
      localStorage.setItem('token', token);
      router.replace({ name: 'home' });
    },
    logout(state) {
      state.userToken = null;
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
    }
  },
  actions: {
    signup(store, userData) {
      axios
        .post('/user/signup', userData)
        .then(res =>
          store.commit('setSuccessMsg', res.data.message, { root: true })
        )
        .catch(error =>
          store.commit('setErrorMsg', error.message, { root: true })
        );
    },
    login(store, userData) {
      axios
        .post('/user/login', userData)
        .then(res => {
          store.commit('login', res.headers['access-token']);
          store.commit('setSuccessMsg', res.data.message, { root: true });
        })
        .catch(error =>
          store.commit('setErrorMsg', error.message, { root: true })
        );
    }
  },
  getters: {
    authenticated(state) {
      return state.userToken !== null;
    }
  }
};

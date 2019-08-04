import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users';
import dictionary from './modules/dictionary';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    dictionary
  },
  state: {
    successMsg: '',
    errorMsg: ''
  },
  mutations: {
    setSuccessMsg(state, message) {
      state.successMsg = message;
    },
    setErrorMsg(state, message) {
      state.errorMsg = message;
    },
    clearSuccessMsg(state) {
      state.successMsg = '';
    },
    clearErrorMsg(state) {
      state.errorMsg = '';
    }
  }
});

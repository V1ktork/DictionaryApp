import axios from 'axios';

export default {
  namespaced: true,
  state: {
    words: null,
    loaded: false
  },
  mutations: {
    fetchAllWords(state, data) {
      state.words = data;
      state.loaded = true;
    },
    clearWords(state) {
      state.words = null;
      state.loaded = false;
    }
  },
  actions: {
    fetchAllWords(store) {
      axios
        .get('/dictionary')
        .then(res => store.commit('fetchAllWords', res.data))
        .catch(error =>
          store.commit('setErrorMsg', error.message, { root: true })
        );
    }
  }
};

import axios from 'axios';

export default {
  namespaced: true,
  state: {
    words: null
  },
  mutations: {
    fetchAllWords(state, data) {
      state.words = data;
    },
    clearWords(state) {
      state.words = null;
    },
    addWord(state) {},
    changeWord(state) {},
    deleteWord(state) {}
  },
  actions: {
    fetchAllWords(store) {
      return new Promise((resolve, reject) => {
        axios
          .get('/dictionary')
          .then(res => {
            if (res.data.empty) {
              return reject(res.data);
            }
            store.commit('fetchAllWords', res.data);
            resolve(res.data);
          })
          .catch(error => {
            store.commit('setErrorMsg', error.message, { root: true });
            reject(error);
          });
      });
    },
    fetchGroupOfWords(store, apiLink) {
      return new Promise((resolve, reject) => {
        axios
          .get(apiLink)
          .then(res => resolve(res.data))
          .catch(error => {
            store.commit('setErrorMsg', error.message, { root: true });
            reject(error);
          });
      });
    },
    addWord(store) {
      return new Promise((resolve, reject) => {});
    },
    changeWord(store) {
      return new Promise((resolve, reject) => {});
    },
    deleteWord(store) {
      return new Promise((resolve, reject) => {});
    }
  }
};

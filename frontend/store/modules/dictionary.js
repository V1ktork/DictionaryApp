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
    addWord(state, newWord) {
      if (!state.words) {
        state.words = {
          data: []
        };
      }
      state.words.data.push(newWord.data);
    },
    changeWord(state, changedWord) {
      if (state.words) {
        let idx = state.words.data.findIndex(
          el => el._id === changedWord.data._id
        );

        Object.assign(state.words.data[idx], changedWord.data);
      }
    },
    deleteWord(state, word) {
      if (state.words) {
        let idx = state.words.data.findIndex(el => el._id === word._id);
        state.words.data.splice(idx, 1);
      }
    }
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
    addWord(store, word) {
      return new Promise((resolve, reject) => {
        axios
          .post('/dictionary', word)
          .then(res => {
            store.commit('setSuccessMsg', res.data.message, { root: true });
            store.commit('addWord', res.data);
            resolve(res.data);
          })
          .catch(error => {
            store.commit('setErrorMsg', error.message, { root: true });
          });
      });
    },
    changeWord(store, options) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `/dictionary/${options.wordToChange.partOfSpeech}/${options.wordToChange.name}`,
            options.payload
          )
          .then(res => {
            store.commit('setSuccessMsg', res.data.message, { root: true });
            store.commit('changeWord', res.data);
            resolve(res.data);
          })
          .catch(error => {
            console.log(error);
            store.commit('setErrorMsg', error.message, { root: true });
          });
      });
    },
    deleteWord(store, word) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/dictionary/${word.partOfSpeech}/${word.name}`)
          .then(res => {
            store.commit('setSuccessMsg', res.data.message, { root: true });
            store.commit('deleteWord', word);
            resolve(res.data);
          })
          .catch(error => {
            store.commit('setErrorMsg', error.message, { root: true });
          });
      });
    }
  }
};

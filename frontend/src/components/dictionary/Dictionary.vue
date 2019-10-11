<template>
  <main class="dictionary col-lg-9 mx-auto">
    <div class="wrapper shadow p-3 rounded-lg">
      <div v-if="loading" class="text-center spinner">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <template v-else>
        <template v-if="words.message">
          <div class="message">
            <h4 class="text-center">{{ words.message }}</h4>

            <button
              v-if="words.empty"
              @click="addWord"
              class="add-word mt-4 btn btn-success"
            >+ Добавить</button>
          </div>
        </template>

        <div v-else class="content">
          <div class="filters mb-2">
            <div class="left">
              <span class="quantity badge badge-secondary">
                Слов:
                <strong>{{ quantity }}</strong>
              </span>
              <button @click="addWord" class="add-word ml-2 btn btn-sm btn-success">+ Добавить</button>
            </div>

            <filters :words="words" @filtered="getFilteredWords"></filters>
          </div>

          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Слово</th>
                  <th scope="col">Перевод</th>
                  <th scope="col">Часть речи</th>
                  <th scope="col">Опции</th>
                </tr>
              </thead>

              <tbody>
                <word
                  @change-word="changeWord(oneWord)"
                  @delete-word="deleteWord(oneWord)"
                  v-for="oneWord in wordsForCurrentPage.data"
                  :word="oneWord"
                  :key="oneWord.name"
                ></word>
              </tbody>
            </table>
          </div>

          <pagination :dataArray="filteredWords.data" @paginate="getWordsForCurrentPage"></pagination>
        </div>
      </template>
    </div>

    <transition name="modal">
      <keep-alive>
        <modal v-if="modalVisible" :modalVisible="modalVisible" @modal-close="modalVisible = false">
          <template slot="title">
            <template v-if="modal == 'add'">Добавить слово</template>
            <template v-if="modal == 'change'">Изменить слово</template>
          </template>

          <form class="modal-form" method="post">
            <div class="form-group">
              <label for="name">Слово:</label>
              <input
                ref="word"
                v-model.trim="wordInfo.name"
                @blur="$v.wordInfo.name.$touch()"
                :class="{ 'is-invalid': $v.wordInfo.name.$error, 'is-valid': !$v.wordInfo.name.$error && $v.wordInfo.name.$dirty }"
                type="text"
                id="name"
                class="form-control"
                aria-describedby="nameHelp"
              >
              <div class="invalid-feedback">
                <div v-if="!$v.wordInfo.name.required">Поле обязательно для заполнения!</div>
                <div v-if="!$v.wordInfo.name.alpha">Разрешены только буквы</div>
                <div v-if="!$v.wordInfo.name.maxLength">Длина не должна превышать 30 символов.</div>
              </div>
            </div>

            <div class="form-group">
              <label for="translation">Перевод:</label>
              <input
                v-model.trim="wordInfo.translation"
                @blur="$v.wordInfo.translation.$touch()"
                :class="{ 'is-invalid': $v.wordInfo.translation.$error, 'is-valid': !$v.wordInfo.translation.$error && $v.wordInfo.translation.$dirty }"
                type="text"
                id="translation"
                class="form-control"
                aria-describedby="translationHelp"
              >
              <div class="invalid-feedback">
                <div v-if="!$v.wordInfo.translation.required">Поле обязательно для заполнения!</div>
                <div
                  v-if="$v.wordInfo.translation.required && !$v.wordInfo.translation.ruLetters"
                >Разрешены только русские буквы</div>
                <div
                  v-if="!$v.wordInfo.translation.maxLength"
                >Длина не должна превышать 30 символов.</div>
              </div>
            </div>

            <div class="form-group">
              <label for="partOfSpeech">Часть речи:</label>
              <select
                v-model="wordInfo.partOfSpeech"
                @blur="$v.wordInfo.partOfSpeech.$touch()"
                :class="{ 'is-invalid': $v.wordInfo.partOfSpeech.$error, 'is-valid': !$v.wordInfo.partOfSpeech.$error && $v.wordInfo.partOfSpeech.$dirty }"
                id="partOfSpeech"
                class="custom-select"
              >
                <option
                  v-for="option in partOfSpeechOptions"
                  :value="option.value"
                  :key="option.value"
                >{{ option.text }}</option>
              </select>
            </div>

            <div v-if="modal == 'change'" class="form-group">
              <label for="state">В состоянии:</label>
              <select
                v-model="wordInfo.state"
                @blur="$v.wordInfo.state.$touch()"
                :class="{ 'is-invalid': $v.wordInfo.state.$error, 'is-valid': !$v.wordInfo.state.$error && $v.wordInfo.state.$dirty }"
                id="state"
                class="custom-select"
              >
                <option
                  v-for="option in stateOptions"
                  v-bind:value="option.value"
                  :key="option.value"
                >{{ option.text }}</option>
              </select>
            </div>
          </form>

          <template slot="footer">
            <input
              v-if="modal == 'add'"
              :disabled="$v.$invalid"
              @click.prevent="submitAdd"
              type="submit"
              value="Добавить"
              class="btn btn-primary"
            >
            <input
              v-if="modal == 'change'"
              :disabled="$v.$invalid"
              @click.prevent="submitChange"
              type="submit"
              value="Изменить"
              class="btn btn-primary"
            >
          </template>
        </modal>
      </keep-alive>
    </transition>
  </main>
</template>

<script>
import filters from "@/components/ux/Filters.vue";
import pagination from "@/components/ux/Pagination.vue";
import word from "@/components/dictionary/Word.vue";
import {
  alpha,
  required,
  requiredUnless,
  maxLength
} from "vuelidate/lib/validators";
import cloneDeep from "lodash/cloneDeep";

import { mapState } from "vuex";

export default {
  components: {
    filters,
    pagination,
    word,
    modal: () =>
      import(/* webpackChunkName: "modal" */ "@/components/ui/Modal.vue")
  },
  data() {
    return {
      words: null,
      filteredWords: {
        data: null
      },
      wordsForCurrentPage: {
        data: null
      },
      wordInfo: {
        name: null,
        translation: null,
        state: null,
        partOfSpeech: null
      },
      wordToChange: {},
      stateOptions: [
        { text: "На изучении", value: "study" },
        { text: "Тяжело запомнить", value: "struggle" },
        { text: "Выучено", value: "learned" }
      ],
      partOfSpeechOptions: [
        { text: "Существительное", value: "noun" },
        { text: "Прилагательное", value: "adjective" },
        { text: "Глагол", value: "verb" },
        { text: "Наречие", value: "adverb" }
      ],
      modal: "",
      modalVisible: false
    };
  },
  computed: {
    ...mapState({
      allWords: state => state.dictionary.words
    }),
    loading() {
      return this.words ? false : true;
    },
    quantity() {
      return this.filteredWords.data ? this.filteredWords.data.length : 0;
    }
  },
  methods: {
    /* При обновлении компонента вычисляем передаваемый массив слов.
    Если на складе ещё нет данных, то запрашиваем их с сервера.
    Если массив данных есть, то фильтруем необходимые слова из него.
    */
    calculateWords() {
      if (this.$route.params.word) {
        this.allWords
          ? (this.words = { data: this.getOneWord() })
          : this.fetchWords();
      } else if (this.$route.params.partOfSpeech) {
        this.allWords
          ? (this.words = { data: this.getGroupOfWords() })
          : this.fetchWords();
      } else {
        this.allWords
          ? (this.words = cloneDeep(this.allWords))
          : this.fetchWords("fetchAllWords");
      }
    },
    fetchWords(action = "fetchGroupOfWords") {
      this.$store
        .dispatch("dictionary/" + action, this.$route.fullPath)
        .then(res => (this.words = cloneDeep(res)))
        .catch(err => (this.words = err));
    },
    getOneWord() {
      let result = this.allWords.data.find(
        el => el.name === this.$route.params.word
      );
      return result ? [result] : [];
    },
    getGroupOfWords() {
      return this.allWords.data.filter(
        el => el.partOfSpeech === this.$route.params.partOfSpeech
      );
    },
    getFilteredWords(payload) {
      this.filteredWords = payload;
    },
    getWordsForCurrentPage(payload) {
      this.wordsForCurrentPage = payload;
    },
    addWord() {
      for (const k in this.wordInfo) {
        this.wordInfo[k] = null;
      }
      this.$v.$reset();
      this.modal = "add";
      this.modalVisible = true;

      setTimeout(() => {
        this.$refs.word.focus();
      }, 100);
    },
    changeWord(word) {
      for (const k in this.wordInfo) {
        this.wordInfo[k] = word[k];
      }
      this.wordToChange = word;
      this.$v.$reset();
      this.modal = "change";
      this.modalVisible = true;

      setTimeout(() => {
        this.$refs.word.focus();
      }, 100);
    },
    deleteWord(word) {
      this.$store.dispatch("dictionary/deleteWord", word).then(res => {
        let idx = this.words.data.findIndex(el => el._id === word._id);
        this.words.data.splice(idx, 1);
      });
    },
    submitAdd() {
      this.modalVisible = false;
      this.$store.dispatch("dictionary/addWord", this.wordInfo).then(res => {
        this.calculateWords();
        this.words.empty = null;
        this.words.message = null;
      });
    },
    submitChange() {
      this.modalVisible = false;
      this.$store
        .dispatch("dictionary/changeWord", {
          wordToChange: this.wordToChange,
          payload: this.wordInfo
        })
        .then(res => {
          this.calculateWords();
        });
    }
  },
  watch: {
    $route: {
      handler() {
        this.words = null;
        this.calculateWords();
      },
      immediate: true
    }
  },
  validations: {
    wordInfo: {
      name: {
        alpha,
        required,
        maxLength: maxLength(30)
      },
      translation: {
        ruLetters(translation) {
          return /^[а-яА-Я ]+$/.test(translation);
        },
        required,
        maxLength: maxLength(30)
      },
      state: {
        required: requiredUnless(vm => vm.modal !== "change")
      },
      partOfSpeech: {
        required
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dictionary {
  padding-bottom: 75px;
  min-height: 360px;
}
.wrapper {
  background-color: #f1f1f1;
  display: flex;
  width: 100%;
  min-height: 360px;
}
.message,
.spinner {
  padding: 0px 10%;
  align-self: center;
  width: 100%;
}
.content {
  width: 100%;
}
tbody {
  font-size: 18px;
}
.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.75rem;
}
.left {
  display: flex;
  align-items: center;
}
.quantity {
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 0.25rem 0.5rem;
  border: 1px #636b73 solid;
  font-weight: 500;
}
.add-word {
  font-weight: 500;
}
.message .add-word {
  margin: 0 auto;
  display: block;
  max-width: 140px;
}
.form-group:last-of-type {
  margin-bottom: 0;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease-out;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
@media screen and (max-width: 540px) {
  .message,
  .spinner {
    padding: 0;
  }
}
@media screen and (max-width: 420px) {
  .message {
    font-size: 20px;
    letter-spacing: -0.2px;
  }
}
</style>
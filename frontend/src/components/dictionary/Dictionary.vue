<template>
  <main class="dictionary col-lg-9 mx-auto">
    <div class="wrapper shadow p-3 rounded-lg">
      <div v-if="loading" class="text-center spinner">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <template v-else>
        <h4 v-if="words.message" class="message text-center">{{ words.message }}</h4>

        <div v-else class="content">
          <div class="filters mb-2">
            <div class="left">
              <span class="quantity badge badge-secondary">
                Слов:
                <strong>{{ quantity }}</strong>
              </span>
              <button class="add-word ml-2 btn btn-sm btn-success">+ Добавить</button>
            </div>

            <filters :words="words" @filtered="getFilteredWords"></filters>
          </div>

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
              <word v-for="oneWord in filteredWords.data" :word="oneWord" :key="oneWord.name"></word>
              <word v-for="oneWord in filteredWords.data" :word="oneWord" :key="oneWord.name + 1"></word>
            </tbody>
          </table>
        </div>
      </template>
    </div>

    <transition name="modal">
      <keep-alive>
        <modal v-if="modalVisible" :modalVisible="modalVisible" @modal-close="modalVisible = false">
          <template slot="title">My tytle</template>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, accusamus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, accusamus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, accusamus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, accusamus?</p>
        </modal>
      </keep-alive>
    </transition>
  </main>
</template>

<script>
import filters from "@/components/ux/Filters.vue";
import word from "@/components/dictionary/Word.vue";
import { mapState } from "vuex";

export default {
  components: {
    filters,
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
    fetchWords(action = "fetchGroupOfWords") {
      this.$store
        .dispatch("dictionary/" + action, this.$route.fullPath)
        .then(res => (this.words = res))
        .catch(err => (this.words = err));
    },
    getOneWord() {
      return this.allWords.data.find(el => el.name === this.$route.params.word);
    },
    getGroupOfWords() {
      return this.allWords.data.filter(
        el => el.partOfSpeech === this.$route.params.partOfSpeech
      );
    },
    getFilteredWords(payload) {
      this.filteredWords = payload;
    },
    addWord(store) {},
    changeWord(store) {},
    deleteWord(store) {}
  },
  watch: {
    /* При обновлении компонента вычисляем передаваемый массив слов.
    Если на складе ещё нет данных, то запрашиваем их с сервера.
    Если массив данных есть, то фильтруем необходимые слова из него.
    */
    $route: {
      handler() {
        this.words = null;

        if (this.$route.params.word) {
          this.allWords
            ? (this.words = { data: [this.getOneWord()] })
            : this.fetchWords();
        } else if (this.$route.params.partOfSpeech) {
          this.allWords
            ? (this.words = { data: this.getGroupOfWords() })
            : this.fetchWords();
        } else {
          this.allWords
            ? (this.words = this.allWords)
            : this.fetchWords("fetchAllWords");
        }
      },
      immediate: true
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
  display: table;
  width: 100%;
  height: 100%;
  min-height: 360px;
}
.message,
.spinner {
  display: table-cell;
  vertical-align: middle;
  width: 80%;
  padding: 0px 10%;
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
    display: table-cell;
    vertical-align: middle;
    width: 100%;
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
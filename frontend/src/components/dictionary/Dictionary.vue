<template>
  <main class="dictionary col-lg-9 mx-auto">
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <template v-else>
      <div v-if="words.message" class="message">{{ words.message }}</div>

      <div v-else class="content shadow p-3 rounded-lg">
        <filters :words="words" :quantity="quantity" @filtered="getFilteredWords"></filters>

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
          </tbody>
        </table>
      </div>
    </template>
  </main>
</template>

<script>
import filters from "@/components/ux/Filters.vue";
import word from "@/components/dictionary/Word.vue";
import { mapState } from "vuex";

export default {
  components: {
    filters,
    word
  },
  data() {
    return {
      words: null,
      filteredWords: {
        data: null
      }
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
    }
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
.content {
  background-color: #f1f1f1;
}
</style>
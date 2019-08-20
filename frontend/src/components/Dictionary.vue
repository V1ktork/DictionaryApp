<template>
  <main class="dictionary row">
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <template v-else>
      <div v-if="words.message" class="message">{{ words.message }}</div>

      <div v-else class="content col-md-8">
        <filters :words="words"></filters>

        <table class="table table-hover">
          <tbody>
            <word v-for="oneWord in words.data" :word="oneWord" :key="oneWord.name"></word>
          </tbody>
        </table>
      </div>
    </template>
  </main>
</template>

<script>
import filters from "@/components/Filters.vue";
import word from "@/components/Word.vue";
import { mapState } from "vuex";

export default {
  components: {
    filters,
    word
  },
  data() {
    return {
      words: null
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
      return this.words.data ? this.words.data.length : 0;
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
    }
  },
  watch: {
    /* При изменении маршрута или обновлении компонента вычисляем
    передаваемый массив слов. Если на складе ещё нет данных, то запрашиваем их
    с сервера и передаём компоненту дальше. Если данные есть
    (массив всех слов не пустой), то фильтруем необходимые слова из него.
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
</style>
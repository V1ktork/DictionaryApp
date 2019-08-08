<template>
  <main class="dictionary">
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <template v-else>
      <div v-if="words.message" class="a">{{ words.message }}</div>
      <div v-else class="b">
        <filters :words="words"></filters>
        {{ words.data }}
      </div>

      <button
        @click="modalVisible = !modalVisible"
        type="button"
        class="btn btn-primary"
      >Launch demo modal</button>

      <transition name="modal">
        <keep-alive>
          <modal
            v-if="modalVisible"
            :modalVisible="modalVisible"
            @modal-close="modalVisible = false"
          >
            <template slot="title">My tytle</template>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, accusamus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, accusamus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, accusamus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, accusamus?</p>
          </modal>
        </keep-alive>
      </transition>
    </template>
  </main>
</template>

<script>
import filters from "@/components/Filters.vue";
import { mapState } from "vuex";

export default {
  components: {
    filters,
    modal: () =>
      import(/* webpackChunkName: "modal" */ "@/components/Modal.vue")
  },
  data() {
    return {
      words: null,
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
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease-out;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
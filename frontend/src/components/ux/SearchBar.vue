<template>
  <div v-on-clickaway="away" class="search-bar">
    <form @submit.prevent class="form-inline">
      <input
        v-model.trim="searchInput"
        @input="search"
        @focus="fetchWords"
        class="form-control search-input"
        type="search"
        placeholder="Поисковый запрос"
        aria-label="Поиск"
      >
    </form>

    <div v-if="touched" class="matches shadow list-group">
      <p
        class="not-found"
        v-if="matches.length < 1"
      >Не найдено слов, удовлетворяющих вашему запросу.</p>

      <ul @click="away" class="wrapper" v-else>
        <router-link
          v-for="word in matches"
          :key="word._id"
          :to="{name: 'word', params: {partOfSpeech: word.partOfSpeech, word: word.name}}"
          tag="li"
        >
          <a class="list-group-item list-group-item-action">
            <span class="name">{{ word.name }}</span>
            <span class="translation">&ensp;—&ensp;{{ word.translation }}</span>
            <!-- <span class="badge badge-primary badge-pill">{{ word.partOfSpeech }}</span> -->
          </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
import debounce from "lodash/debounce";
import { mapState } from "vuex";

export default {
  mixins: [clickaway],
  data() {
    return {
      touched: false,
      searchInput: "",
      matches: []
    };
  },
  computed: {
    ...mapState({
      words: state => state.dictionary.words
    })
  },
  methods: {
    fetchWords() {
      if (!this.words) {
        this.$store.dispatch("dictionary/fetchAllWords");
      }
    },
    search: debounce(
      function() {
        this.touched = true;
        const regExp = new RegExp(`^${this.searchInput}`, "i");

        if (this.searchInput.length >= 1 && this.words) {
          let matches = this.words.data.filter(word => {
            return word.name.match(regExp) || word.translation.match(regExp);
          });

          this.matches = matches
            .sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
            .splice(0, 10);
        } else {
          this.matches = [];
        }
      },
      250,
      {
        leading: true
      }
    ),
    away() {
      this.touched = false;
      this.searchInput = "";
      console.log("away");
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  height: 100%;
}
.search-bar {
  position: relative;
  margin-left: 15px;
}
.search-input {
  min-width: 220px;
}
.matches {
  position: absolute;
  left: -50%;
  top: 100%;
  width: 150%;
  min-width: 330px;
  z-index: 100;
  background-color: #fff;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  padding: 5px 0px;
}
.not-found {
  text-align: center;
  margin: 0;
  padding: 8px;
}
.wrapper {
  list-style-type: none;
  padding: 0;

  & li:last-of-type a {
    border: none;
  }

  .list-group-item {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    padding: 0.5rem 1.25rem;
    word-break: break-all;
  }

  .badge {
    margin-left: 10px;
    font-weight: 500;
  }
}

.name {
  font-weight: bold;
}

@media screen and (max-width: 991px) {
  .search-bar {
    margin-left: 0;
  }
  .search-input {
    min-width: auto;
    max-width: 200px;
  }
}

@media screen and (max-width: 767px) {
  .search-bar {
    .search-input {
      width: 100%;
      max-width: 100%;
    }
    .matches {
      left: 0;
      width: 100%;
    }
  }
}
</style>

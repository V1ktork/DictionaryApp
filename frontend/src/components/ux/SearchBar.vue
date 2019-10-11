<template>
  <form class="form-inline">
    <input
      v-model.trim="searchInput"
      @input="search"
      class="form-control mr-sm-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
    >
    <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
  </form>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      touched: false,
      searchInput: "",
      result: []
    };
  },
  computed: {
    ...mapState({
      words: state => state.dictionary.words
    })
  },
  methods: {
    search() {
      const regExp = new RegExp(`^${this.searchInput}`, "i");

      if (this.searchInput.length >= 1) {
        let matches = this.words.data.filter(word => {
          return word.name.match(regExp) || word.translation.match(regExp);
        });

        console.log(matches);
      }
    }
  }
};
</script>

<style>
</style>

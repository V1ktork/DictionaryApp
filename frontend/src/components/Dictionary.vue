<template>
  <div class="dictionary">
    <div v-if="!loaded" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <template v-else>
      <div v-if="words.message" class="a">{{ words.message }}</div>
      <div v-else class="b">{{ words.data }}</div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      words: state => state.dictionary.words,
      loaded: state => state.dictionary.loaded
    }),
    quantity() {
      if (this.words.data) {
        return this.words.data.length;
      }
    }
  }
};
</script>

<style>
</style>

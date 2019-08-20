<template>
  <div v-on-clickaway="away" class="dropdown d-inline-block" :class="dropdownShowed">
    <button
      @click="dropdown = !dropdown"
      class="btn btn-secondary dropdown-toggle"
      type="button"
      aria-haspopup="true"
    >
      <slot name="title"></slot>
    </button>

    <div @click="away" class="dropdown-menu" :class="dropdownShowed">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  data() {
    return {
      dropdown: false
    };
  },
  computed: {
    dropdownShowed() {
      return this.dropdown ? "show" : "";
    }
  },
  methods: {
    away() {
      this.dropdown = false;
    }
  }
};
</script>

<style>
</style>

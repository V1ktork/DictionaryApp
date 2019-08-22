<template>
  <div v-on-clickaway="away" class="dropdown d-inline-block" :class="dropdownShowed">
    <button
      @click="dropdown = !dropdown"
      class="btn btn-primary dropdown-toggle"
      type="button"
      aria-haspopup="true"
    >
      <slot name="title"></slot>
    </button>

    <div @click="close" class="dropdown-menu" :class="dropdownShowed">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  props: {
    hideOnClick: {
      type: Boolean,
      default: true
    }
  },
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
    },
    close() {
      if (this.hideOnClick) {
        this.dropdown = false;
      }
    }
  }
};
</script>

<style>
</style>

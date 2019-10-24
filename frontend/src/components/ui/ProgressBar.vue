<template>
  <div class="progress">
    <div
      class="progress-bar"
      role="progressbar"
      :style="{ width: progressBarWidth + '%' }"
      aria-valuemin="0"
      aria-valuemax="100"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    currentQuestion: {
      type: Number
    },
    totalQuestions: {
      type: Number
    }
  },
  computed: {
    progressBarWidth() {
      return Math.floor((this.currentQuestion * 100) / this.totalQuestions);
    }
  }
};
</script>

<style lang="scss" scoped>
.progress {
  margin-bottom: 12px;
}
</style>

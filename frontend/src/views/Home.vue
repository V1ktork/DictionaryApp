<template>
  <page-layout>
    <div class="home">
      <navigation></navigation>
    </div>
  </page-layout>
</template>

<script>
import pageLayout from "@/layouts/PageLayout.vue";
import navigation from "@/components/Navigation";

export default {
  components: {
    pageLayout,
    navigation
  }
};
</script>

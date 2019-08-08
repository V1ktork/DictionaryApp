<template>
  <div>
    <button @click="sortByName" type="button" class="btn btn-primary">Filter</button>
    <br>
    <button @click="sortByName(false)" type="button" class="btn btn-primary">Filter Reverse</button>
    <hr>
    <button @click="sortByDate('createdAt')" type="button" class="btn btn-primary">Filter</button>
    <br>
    <button
      @click="sortByDate('createdAt', false)"
      type="button"
      class="btn btn-primary"
    >Filter Reverse</button>
    <hr>
    <button @click="sortByDate('updatedAt')" type="button" class="btn btn-primary">Filter</button>
    <br>
    <button
      @click="sortByDate('updatedAt', false)"
      type="button"
      class="btn btn-primary"
    >Filter Reverse</button>
  </div>
</template>

<script>
export default {
  props: ["words"],
  data() {
    return {
      sortOptions: []
    };
  },
  methods: {
    sortByName(inOrder = true) {
      const result = this.words.data.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      return inOrder ? result : result.reverse();
    },
    sortByDate(dateField, inOrder = true) {
      const result = this.words.data.sort((a, b) => {
        const dateA = new Date(a[dateField]);
        const dateB = new Date(b[dateField]);
        return dateA - dateB;
      });
      return inOrder ? result : result.reverse();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

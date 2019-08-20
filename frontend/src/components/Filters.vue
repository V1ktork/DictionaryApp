<template>
  <div class="filters">
    <dropdown>
      <template slot="title">Сортировать по:</template>

      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
    </dropdown>

    <dropdown>
      <template slot="title">Фильтровать по:</template>

      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
    </dropdown>
  </div>
</template>

<script>
import dropdown from "@/components/Dropdown.vue";

export default {
  props: ["words"],
  components: {
    dropdown
  },
  data() {
    return {
      sortOptions: [
        {
          name: false,
          updateDate: false,
          createDate: false
        }
      ],
      filterOptions: [
        {
          partOfSpeech: false,
          status: false
        }
      ]
    };
  },
  computed: {},
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
      this.words.data.sort((a, b) => {
        const dateA = new Date(a[dateField]);
        const dateB = new Date(b[dateField]);
        return inOrder ? dateA - dateB : dateB - dateA;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

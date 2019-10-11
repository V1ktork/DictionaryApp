<template>
  <nav v-if="totalPages > 1">
    <ul class="pagination justify-content-center">
      <li :class="firstPage" class="page-item">
        <a
          @click="currentPage = 1"
          class="page-link"
          href="#"
          title="Первая страница"
          aria-label="Первая страница"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Первая страница</span>
        </a>
      </li>
      <li :class="firstPage" class="page-item">
        <a @click="currentPage--" class="page-link" href="#">Пред.</a>
      </li>

      <li
        v-for="link in links"
        :key="link"
        :class="{ active: currentPage === link }"
        class="page-item"
      >
        <a @click="currentPage = link" class="page-link" href="#">{{ link }}</a>
      </li>

      <li :class="lastPage" class="page-item">
        <a @click="currentPage++" class="page-link" href="#">След.</a>
      </li>
      <li :class="lastPage" class="page-item">
        <a
          @click="currentPage = totalPages"
          class="page-link"
          href="#"
          title="Последняя страница"
          aria-label="Последняя страница"
        >
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Последняя страница</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    itemsPerPage: {
      type: Number,
      default: 10
    },
    dataArray: {}
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    firstPage() {
      return this.currentPage === 1 ? "disabled" : "";
    },
    lastPage() {
      return this.currentPage === this.totalPages ? "disabled" : "";
    },
    firstLink() {
      let first = this.currentPage - 2;
      return first > 0 ? first : 1;
    },
    lastLink() {
      let last = this.currentPage + 2;
      return last < this.totalPages ? last : this.totalPages;
    },
    links() {
      let links = [];
      for (let i = this.firstLink; i <= this.lastLink; i++) {
        links.push(i);
      }
      return links;
    },
    totalPages() {
      if (this.dataArray) {
        return Math.ceil(this.dataArray.length / this.itemsPerPage || 1);
      }
    },
    itemsForCurrentPage() {
      if (this.dataArray) {
        return this.dataArray.slice(
          (this.currentPage - 1) * this.itemsPerPage,
          this.currentPage * this.itemsPerPage
        );
      }
    }
  },
  methods: {},
  watch: {
    itemsForCurrentPage: {
      handler() {
        this.$emit("paginate", {
          data: this.itemsForCurrentPage
        });
      }
    },
    totalPages() {
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 420px) {
  .page-link {
    padding: 0.5rem 0.6rem;
  }
}
</style>


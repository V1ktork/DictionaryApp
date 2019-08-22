<template>
  <div class="filters mb-2">
    <div class="left">
      <span class="quantity badge badge-secondary">
        Слов:
        <strong>{{ quantity }}</strong>
      </span>
    </div>

    <div v-show="quantity > 1" class="right">
      <dropdown>
        <template slot="title">Сортировать по:</template>

        <button
          v-for="(option, ind) in sortOptions"
          :key="option.sortBy"
          @click="sortMethod(option.sortBy, option.inOrder, ind)"
          class="dropdown-item"
        >
          {{ option.title }}
          <span class="triangle">{{ option.inOrder ? '&#9660;' : '&#9650;' }}</span>
        </button>
      </dropdown>

      <dropdown :hideOnClick="false">
        <template slot="title">Фильтровать по:</template>

        <div v-for="option in filterOptions" :key="option.filter" class="dropdown-item no-active">
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              v-model="option.active"
              :id="option.filter"
            >
            <label class="custom-control-label" :for="option.filter">{{ option.title }}</label>
          </div>
        </div>
      </dropdown>
    </div>
  </div>
</template>

<script>
import dropdown from "@/components/ui/Dropdown.vue";

export default {
  props: ["words", "quantity"],
  components: {
    dropdown
  },
  data() {
    return {
      sortOptions: [
        {
          title: "Имени",
          sortBy: "name",
          inOrder: true
        },
        {
          title: "Дате изменения",
          sortBy: "updatedAt",
          inOrder: true
        },
        {
          title: "Дате добавления",
          sortBy: "createdAt",
          inOrder: true
        }
      ],
      filterOptions: [
        {
          title: "На изучении",
          filter: "study",
          active: false
        },
        {
          title: "Выученные",
          filter: "learned",
          active: false
        },
        {
          title: "С трудностями",
          filter: "struggle",
          active: false
        }
      ]
    };
  },
  methods: {
    sortMethod(sortBy, order, ind) {
      sortBy === "name"
        ? this.sortByName(order)
        : this.sortByDate(sortBy, order);

      this.sortOptions[ind].inOrder = !order;
    },
    sortByName(inOrder) {
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
    sortByDate(dateField, inOrder) {
      this.words.data.sort((a, b) => {
        const dateA = new Date(a[dateField]);
        const dateB = new Date(b[dateField]);
        return inOrder ? dateA - dateB : dateB - dateA;
      });
    }
  },
  watch: {
    filterOptions: {
      handler() {
        let qwe = this.filterOptions.map(el => (el.active ? el.filter : null));
        console.log(qwe);

        let result = this.words.data.filter(el => {
          return el.state === "study";
        });

        this.$emit("filtered", { data: result });
      },
      deep: true
    },
    words: {
      handler() {
        this.$emit("filtered", this.words);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.75rem;
}
.quantity {
  font-size: 16px;
}
.dropdown:first-of-type {
  margin-right: 0.5rem;
}
.triangle {
  font-size: 12px;
}
.no-active:active {
  color: inherit;
  background-color: #f8f9fa;
}
.custom-checkbox label {
  cursor: pointer;
}
</style>

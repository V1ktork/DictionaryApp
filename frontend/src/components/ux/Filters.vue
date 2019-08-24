<template>
  <div class="right">
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
</template>

<script>
import dropdown from "@/components/ui/Dropdown.vue";

export default {
  props: ["words"],
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
  computed: {
    filterList() {
      let list = [];

      this.filterOptions.forEach(el => {
        if (el.active) {
          list.push(el.filter);
        }
      });

      return list;
    }
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
        return inOrder ? dateB - dateA : dateA - dateB;
      });
    },
    filterMethod() {
      if (this.filterList.length < 1) {
        this.$emit("filtered", this.words);
      } else {
        let result = this.words.data.filter(el => {
          return this.filterList.some(criteria => {
            return el.state === criteria;
          });
        });

        this.$emit("filtered", { data: result });
      }
    }
  },
  watch: {
    filterOptions: {
      handler: "filterMethod",
      deep: true
    },
    words: {
      handler: "filterMethod",
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
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

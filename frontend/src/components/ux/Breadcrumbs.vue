<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <router-link
        v-for="item in breadcrumbs"
        :key="item.title"
        :to="item.path"
        tag="li"
        exact
        class="breadcrumb-item"
      >
        <a>{{ item.title }}</a>
      </router-link>
      <li class="breadcrumb-item active" aria-current="page">{{ currentTitle }}</li>
    </ol>
  </nav>
</template>

<script>
export default {
  computed: {
    currentTitle() {
      return this.$route.meta.crumbTitle || "Текущая страница";
    },
    breadcrumbs() {
      let pathList = [];

      this.$route.path.split("/").reduce((fullPath, currentPath, i) => {
        pathList.push(fullPath);
        return fullPath + "/" + currentPath;
      });

      pathList.shift();

      pathList = pathList.map((el, i) => {
        return {
          path: pathList[i],
          title: this.$route.matched[i].meta.crumbTitle
        };
      });

      pathList.unshift({
        path: "/",
        title: "Главная"
      });

      return pathList;
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  background-color: rgba(233, 236, 239, 0.25);
}
.breadcrumb-item {
  font-weight: 500;
}
.breadcrumb-item.active {
  color: #f1f1f1;
}
</style>

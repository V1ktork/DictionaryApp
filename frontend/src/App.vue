<template>
  <div id="app" class="container">
    <keep-alive>
      <header-app v-if="allowHeader"></header-app>
    </keep-alive>

    <notification></notification>

    <transition appear name="fade" mode="out-in">
      <breadcrumbs v-if="allowBreadcrumbs"></breadcrumbs>
    </transition>

    <transition appear name="fade" mode="out-in">
      <router-view/>
    </transition>

    <footer-app></footer-app>
  </div>
</template>

<script>
import headerApp from "@/components/HeaderApp";
import notification from "@/components/Notification";
import breadcrumbs from "@/components/Breadcrumbs";
import footerApp from "@/components/FooterApp";

export default {
  components: {
    headerApp,
    notification,
    breadcrumbs,
    footerApp
  },
  computed: {
    allowHeader() {
      return this.$route.meta.allowHeader;
    },
    allowBreadcrumbs() {
      return this.$route.meta.allowBreadcrumbs;
    }
  }
};
</script>


<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
body {
  background: linear-gradient(90deg, darken(#0fa, 15%), darken(#0fa, 8%));
  box-shadow: inset 0px 0px 90px rgba(0, 0, 0, 0.5);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
#app {
  height: 100%;
  position: relative;
}
.d-table {
  display: table;
  height: 100%;
  width: 100%;
}
.login,
.signup,
.not-found {
  display: table-cell;
  vertical-align: middle;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

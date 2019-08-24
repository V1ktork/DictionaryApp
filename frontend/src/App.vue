<template>
  <div id="app" class="container">
    <div class="row">
      <keep-alive>
        <header-app v-if="allowHeader"></header-app>
      </keep-alive>

      <notification></notification>

      <transition appear name="fade">
        <breadcrumbs v-if="allowBreadcrumbs"></breadcrumbs>
      </transition>

      <transition appear name="fade" mode="out-in">
        <router-view/>
      </transition>

      <footer-app></footer-app>
    </div>
  </div>
</template>

<script>
import headerApp from "@/components/layout/HeaderApp";
import notification from "@/components/ux/Notification";
import breadcrumbs from "@/components/ux/Breadcrumbs";
import footerApp from "@/components/layout/FooterApp";

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
  },
  beforeMount() {
    if (localStorage.getItem("token")) {
      let payload = localStorage.getItem("token").split(".")[1];
      let payloadDecoded = JSON.parse(window.atob(payload));

      if (Math.floor(Date.now() / 1000) >= payloadDecoded.exp) {
        this.$store.dispatch("users/logout");
      }
    }
  }
};
</script>


<style lang="scss">
html,
body,
#app {
  width: 100%;
  min-height: 100vh;
}
body {
  background: linear-gradient(90deg, darken(#0fa, 15%), darken(#0fa, 8%));
  box-shadow: inset 0px 0px 90px rgba(0, 0, 0, 0.5);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.row {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content-centered {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
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

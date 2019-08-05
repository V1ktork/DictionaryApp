<template>
  <div id="app" class="container">
    <notification></notification>
    <transition appear name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import notification from "@/components/Notification.vue";

export default {
  components: {
    notification
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
  position: relative;
}
#app {
  text-align: center;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

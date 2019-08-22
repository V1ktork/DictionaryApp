<template>
  <header class="pt-4">
    <nav class="navbar navbar-expand-sm navbar-dark shadow">
      <router-link :to="{name: 'home'}" class="navbar-brand">DictionaryApp</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-label="Toggle navigation"
        @click="navCollapsed = !navCollapsed"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" :class="navShow" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <router-link
            v-if="this.$route.name !== 'home'"
            :to="{name: 'home'}"
            tag="li"
            active-class="active"
            exact
            class="nav-item"
          >
            <a class="nav-link">Главная</a>
          </router-link>

          <template v-if="!authenticated">
            <router-link
              :to="{name: 'signup'}"
              tag="li"
              active-class="active"
              exact
              class="nav-item"
            >
              <a class="nav-link">Регистрация</a>
            </router-link>

            <router-link
              :to="{name: 'login'}"
              tag="li"
              active-class="active"
              exact
              class="nav-item"
            >
              <a class="nav-link">Авторизация</a>
            </router-link>
          </template>

          <template v-else>
            <router-link :to="{name: 'dictionary'}" tag="li" active-class="active" class="nav-item">
              <a class="nav-link">Словарь</a>
            </router-link>
            <router-link :to="'/dictionary/noun'" tag="li" active-class="active" class="nav-item">
              <a class="nav-link">sdw</a>
            </router-link>
            <router-link
              :to="'/dictionary/noun/bully'"
              tag="li"
              active-class="active"
              class="nav-item"
            >
              <a class="nav-link">sds</a>
            </router-link>

            <button @click="logout" class="btn btn-secondary ml-3">Выход</button>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      navCollapsed: false
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "users/authenticated"
    }),
    navShow() {
      return this.navCollapsed ? "show" : "";
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("users/logout");
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: rgb(0, 132, 255);

  .navbar-brand {
    font-weight: bold;
    color: #f1f1f1;
  }
}
.navbar-nav {
  font-size: 18px;
}
</style>

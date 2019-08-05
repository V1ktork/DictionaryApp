<template>
  <div id="nav">
    <router-link :to="{name: 'home'}">Главная</router-link>|
    <template v-if="!authenticated">
      <router-link :to="{name: 'signup'}">Регистрация</router-link>|
      <router-link :to="{name: 'login'}">Авторизация</router-link>
    </template>
    <template v-else>
      <router-link :to="{name: 'dictionary'}">Словарь</router-link>
      <button @click="logout">Выход</button>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      authenticated: "users/authenticated"
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("users/logout");
    }
  }
};
</script>

<style>
</style>

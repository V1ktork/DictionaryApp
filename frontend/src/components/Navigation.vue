<template>
  <div id="nav">
    <router-link :to="{name: 'home'}">Главная</router-link>|
    <router-link v-if="!authenticated" :to="{name: 'signup'}">Регистрация</router-link>|
    <router-link v-if="!authenticated" :to="{name: 'login'}">Авторизация</router-link>
    <button v-else @click="logout">Выход</button>
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
      this.$store.commit("users/logout");
    }
  }
};
</script>

<style>
</style>

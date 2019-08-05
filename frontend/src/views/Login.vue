<template>
  <page-layout>
    <main class="login">
      <form v-if="!authenticated" method="post">
        <input type="text" name="login" id="login" v-model.trim="login">
        <input type="text" name="password" id="password" v-model.trim="password">
        <input type="submit" value="Отправить" @click.prevent="sendData">
      </form>

      <h2 v-else>Вы уже авторизованы.</h2>

      <router-link :to="{name: 'home'}">← На главную</router-link>
      <router-link v-if="!authenticated" :to="{name: 'signup'}">Регистрация</router-link>
    </main>
  </page-layout>
</template>

<script>
import pageLayout from "@/layouts/PageLayout.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    pageLayout
  },
  data() {
    return {
      login: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "users/authenticated"
    })
  },
  methods: {
    sendData() {
      this.$store.dispatch("users/login", {
        login: this.login,
        password: this.password
      });
    }
  }
};
</script>

<style>
</style>

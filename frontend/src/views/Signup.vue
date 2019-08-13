<template>
  <main class="d-table">
    <div class="signup">
      <div class="mx-auto col-md-6 col-lg-4 shadow p-4 bg-white rounded-lg">
        <h1 class="text-center">Регистрация</h1>

        <p v-if="authenticated" class="h4 my-5 text-center text-muted">Вы уже авторизованы.</p>

        <form v-else method="post">
          <div class="form-group">
            <label for="login">Логин</label>
            <input
              type="text"
              name="login"
              id="login"
              class="form-control"
              aria-describedby="loginHelp"
              placeholder="Имя пользователя"
              v-model.trim="login"
            >
            <small id="loginHelp" class="form-text text-muted">От 4-х английских букв.</small>
          </div>

          <div class="form-group">
            <label for="password">Пароль</label>
            <input
              type="text"
              name="password"
              id="password"
              class="form-control"
              aria-describedby="passwordHelp"
              placeholder="Ваш пароль"
              v-model.trim="password"
            >
            <small id="passwordHelp" class="form-text text-muted">Несколько букв тоже.</small>
          </div>

          <input
            type="submit"
            value="Отправить"
            @click.prevent="sendData"
            class="btn btn-primary mb-3"
          >
        </form>

        <router-link :to="{name: 'home'}">← На главную</router-link>
        <router-link v-if="!authenticated" :to="{name: 'login'}" class="float-right">Авторизация</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
      this.$store.dispatch("users/signup", {
        login: this.login,
        password: this.password
      });
    }
  }
};
</script>
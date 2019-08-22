<template>
  <main class="d-table">
    <div class="login">
      <div class="mx-auto col-md-6 col-lg-4 shadow p-4 bg-white rounded-lg">
        <h1 class="text-center">Авторизация</h1>

        <p v-if="authenticated" class="h4 my-5 text-center text-muted">Вы уже авторизованы.</p>

        <form v-else method="post">
          <div class="form-group">
            <label for="login">Логин</label>
            <input
              v-model.trim="login"
              @blur="$v.login.$touch()"
              :class="{ 'is-invalid': $v.login.$error, 'is-valid': !$v.login.$error && $v.login.$dirty }"
              type="text"
              id="login"
              class="form-control"
              aria-describedby="loginHelp"
              placeholder="Имя пользователя"
            >

            <div class="invalid-feedback">
              <div v-if="!$v.login.required">Поле обязательно для заполнения!</div>
              <div
                v-if="!$v.login.minLength || !$v.login.maxLength"
              >Логин должен содержать от 4-х до 16-и символов.</div>
              <div
                v-if="$v.login.required && !$v.login.validLogin"
              >Разрешены только латинские буквы и цифры.</div>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Пароль</label>
            <input
              v-model.trim="password"
              @blur="$v.password.$touch()"
              :class="{ 'is-invalid': $v.password.$error, 'is-valid': !$v.password.$error && $v.password.$dirty }"
              type="password"
              id="password"
              class="form-control"
              aria-describedby="passwordHelp"
              placeholder="Ваш пароль"
            >

            <div class="invalid-feedback">
              <div v-if="!$v.password.required">Поле обязательно для заполнения!</div>
              <div
                v-if="!$v.password.minLength || !$v.password.maxLength"
              >Пароль должен содержать от 4-х до 16-и символов.</div>
              <div
                v-if="$v.password.required && !$v.password.validPassword"
              >Разрешены только латинские буквы и цифры.</div>
            </div>
          </div>

          <input
            @click.prevent="sendData"
            :disabled="$v.$invalid"
            type="submit"
            value="Отправить"
            class="btn btn-primary mb-3"
          >
        </form>

        <router-link :to="{name: 'home'}">← На главную</router-link>
        <router-link v-if="!authenticated" :to="{name: 'signup'}" class="float-right">Регистрация</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

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
      this.$store.dispatch("users/login", {
        login: this.login,
        password: this.password
      });
    }
  },
  validations: {
    login: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(16),
      validLogin(login) {
        return /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/.test(login);
      }
    },
    password: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(16),
      validPassword(password) {
        return /[a-zA-Z0-9]/.test(password);
      }
    }
  }
};
</script>

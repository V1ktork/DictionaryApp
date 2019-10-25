<template>
  <main class="home col-lg-9 mx-auto">
    <div class="main-screen">
      <img src="@/assets/book-open-flat.svg" alt="book" class="book">

      <h1 class="title">Добро пожаловать в DictionaryApp</h1>
      <p class="subtitle">
        Запоминать новые слова - это совсем несложно!
        <br>И мы вам в этом поможем.
      </p>
    </div>

    <div v-if="authenticated">
      <router-link :to="{name: 'dictionary'}" class="btn btn-lg btn-primary">Перейти к словарю</router-link>
    </div>

    <div v-else>
      <router-link :to="{name: 'signup'}" class="btn btn-lg btn-primary">Зарегистрироваться</router-link>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      authenticated: "users/authenticated"
    })
  }
};
</script>
<style lang="scss" scoped>
.book {
  display: block;
  margin: 100px auto 90px;
  width: 230px;
  height: 230px;
}
.main-screen {
  text-align: center;
  color: #f1f1f1;
}
.title {
  text-shadow: 2px 2px 1px #000;
  letter-spacing: 0.5px;
  font-size: 38px;
  margin-bottom: 15px;
}
.subtitle {
  text-shadow: 1px 1px 3px #000;
  font-size: 22px;
  letter-spacing: 0.3px;
  line-height: 30px;
  margin-bottom: 90px;
}
.btn {
  margin: 0 auto 80px;
  display: block;
  max-width: 290px;
  font-size: 24px;
  font-weight: 500;
}
@media screen and (max-width: 767px) {
  .book {
    width: 200px;
    height: 200px;
  }
  .title {
    letter-spacing: 0;
    font-size: 30px;
  }
  .subtitle {
    font-size: 20px;
    line-height: 28px;
  }
  .btn {
    font-size: 21px;
  }
}
@media screen and (max-height: 840px) {
  .book {
    margin: 70px auto 60px;
  }
  .subtitle {
    margin-bottom: 60px;
  }
}
@media screen and (max-height: 745px) {
  .book {
    margin: 60px auto 50px;
    width: 190px;
    height: 190px;
  }
  .title {
    font-size: 32px;
  }
  .subtitle {
    margin-bottom: 50px;
    font-size: 20px;
    line-height: 28px;
  }
  .btn {
    font-size: 21px;
  }
}
</style>

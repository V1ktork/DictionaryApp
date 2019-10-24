<template>
  <div class="results">
    <h3 class="title">Поздравляем с прохождением!</h3>

    <p class="text">
      Количество правильных ответов:
      <span class="bold">{{ correctAnswers }}</span>
    </p>
    <p
      class="text"
    >Если вы недовольны своим результатом, попробуйте пройти тест ещё раз. Вы&nbsp;также можете вернуться к выбору опций практики.</p>

    <div class="buttons">
      <button @click="$emit('quit')" type="button" class="btn btn-primary">Завершить практику</button>
      <button @click="$emit('restart')" type="button" class="btn btn-primary">Попробовать снова</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    correctAnswers: {
      type: Number
    }
  }
};
</script>

<style lang="scss" scoped>
.results {
  width: 100%;
}
.title {
  margin-bottom: 35px;
  padding: 0 10px;
}
.text {
  font-size: 22px;
  color: #000;
  padding: 0 10px;

  &:last-of-type {
    margin-bottom: 45px;
    font-weight: 300;
  }
}
.bold {
  font-weight: bold;
  color: #007300;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.btn {
  flex-basis: 30%;
  margin: 0 20px 35px 20px;
  font-size: 18px;
  font-weight: 500;
  min-width: 230px;
}
</style>

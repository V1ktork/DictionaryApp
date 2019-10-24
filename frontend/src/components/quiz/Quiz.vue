<template>
  <main class="quiz col-lg-9 mx-auto">
    <div class="wrapper shadow p-3 rounded-lg">
      <h3
        class="error-message"
        v-if="wordsAmount === 0"
      >Для комфортной практики ваш словарь должен насчитывать не менее {{ totalQuestions }} слов.</h3>

      <template v-else>
        <div v-if="state === 'quiz'" class="main-screen">
          <h3 class="title">Тренировка словарного запаса</h3>
          <p class="text">
            Запоминать новые слова - это совсем несложно!
            По умолчанию все слова, отмеченные как "Выученные" исключаются из тренировки. Вы ведь уже изучили их, не так ли? Отметьте желаемые опции и в бой.
          </p>

          <p>
            Выберите количество слов для тренировки:
            <select
              class="custom-select"
              v-model="totalQuestions"
            >
              <option
                v-for="option in totalQuestionsSelect"
                :key="option"
                :value="option"
                :disabled="wordsAmount < option"
              >{{ option }}</option>
            </select>
          </p>

          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="checkbox"
              v-model="onlyDifficultWords"
            >
            <label
              class="custom-control-label"
              for="checkbox"
            >Тренировать только слова с пометкой "Тяжело запомнить"</label>
          </div>

          <p
            v-if="wordsAmount < totalQuestions"
            class="invalid"
          >Количество слов для тренировки меньше отмеченного или минимально допустимого.</p>

          <button
            @click="state = 'question'"
            :disabled="wordsAmount < totalQuestions"
            type="button"
            class="btn btn-lg btn-primary"
          >Начать!</button>
        </div>

        <question
          v-else-if="state === 'question'"
          :currentQuestion="currentQuestion"
          :totalQuestions="totalQuestions"
          :quizList="quizList"
          :words="words"
          @nextQuestion="nextQuestion"
        ></question>

        <results
          v-else-if="state === 'results'"
          :correctAnswers="correctAnswers"
          @restart="restart"
          @quit="quit"
        ></results>
      </template>
    </div>
  </main>
</template>

<script>
import question from "@/components/quiz/Question.vue";
import results from "@/components/quiz/Results.vue";
import { mapState } from "vuex";

export default {
  components: {
    question,
    results
  },
  data() {
    return {
      state: "quiz",
      currentQuestion: 1,
      totalQuestions: 5,
      totalQuestionsSelect: [5, 10, 15, 20, 30],
      correctAnswers: 0,
      onlyDifficultWords: false
    };
  },
  computed: {
    ...mapState({
      allWords: state => state.dictionary.words
    }),
    words() {
      if (this.allWords && this.allWords.data) {
        if (this.onlyDifficultWords) {
          return this.allWords.data.filter(word => {
            return word.state === "struggle";
          });
        }

        return this.allWords.data.filter(word => {
          return word.state !== "learned";
        });
      }
    },
    wordsAmount() {
      if (this.words) {
        return this.words.length;
      }

      return 0;
    },
    quizList() {
      if (this.words && this.wordsAmount >= this.totalQuestions) {
        let indexes = [],
          list = [];

        while (list.length < this.totalQuestions) {
          let index = Math.floor(Math.random() * this.wordsAmount);

          if (!indexes.includes(index)) {
            indexes.push(index);
            list.push(this.words[index]);
          }
        }

        return list;
      }

      return [];
    }
  },
  methods: {
    nextQuestion(answerIsCorrect) {
      if (answerIsCorrect) {
        this.correctAnswers++;
      }

      if (this.currentQuestion < this.totalQuestions) {
        this.currentQuestion++;
      } else {
        this.state = "results";
      }
    },
    restart() {
      this.currentQuestion = 1;
      this.correctAnswers = 0;
      this.state = "question";
    },
    quit() {
      this.currentQuestion = 1;
      this.correctAnswers = 0;
      this.state = "quiz";

      let temp = this.totalQuestions;
      this.totalQuestions = 4;
      this.totalQuestions = temp;
    }
  },
  created() {
    if (!this.words) {
      this.$store.dispatch("dictionary/fetchAllWords");
    }
  }
};
</script>

<style lang="scss" scoped>
.quiz {
  padding-bottom: 75px;
  min-height: 336px;
}
.wrapper {
  position: relative;
  background-color: #f1f1f1;
  display: flex;
  width: 100%;
  min-height: 336px;
}
.error-message {
  text-align: center;
  align-self: center;
}
.invalid {
  color: #dc3545;
  text-align: center;
}
.main-screen {
  width: 100%;
  padding: 0 10px;
}
.title {
  margin-bottom: 25px;
}
.text {
  font-size: 21px;
  margin-bottom: 40px;
}
.custom-checkbox {
  text-align: right;
  margin-bottom: 40px;
}
.custom-control-label {
  font-size: 18px;
  line-height: 22px;
}
p {
  font-size: 18px;
}
.btn {
  min-width: 240px;
  max-width: 280px;
  margin: 0 auto 15px;
  display: block;
}
</style>

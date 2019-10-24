<template>
  <div class="question">
    <progressBar :currentQuestion="currentQuestion" :totalQuestions="totalQuestions"></progressBar>

    <h3 class="title">Выберите правильный перевод</h3>

    <p class="question-number">
      Вопрос
      <span class="bold">{{ currentQuestion }}</span> из
      <span class="bold">{{ totalQuestions }}</span>
    </p>

    <h4 class="word">{{ quizList[currentQuestion - 1].name }}</h4>

    <div class="buttons">
      <button
        v-for="answer in answers"
        :key="answer + currentQuestion"
        @click="checkAnswer($event ,answer)"
        ref="buttons"
        :data-answer="answer"
        type="button"
        class="btn btn-info"
      >{{ answer }}</button>
    </div>
  </div>
</template>

<script>
import progressBar from "@/components/ui/ProgressBar.vue";

export default {
  components: {
    progressBar
  },
  props: {
    currentQuestion: {
      type: Number
    },
    totalQuestions: {
      type: Number
    },
    quizList: {
      type: Array
    },
    words: {
      type: Array
    }
  },
  data() {
    return {
      correctAnswer: ""
    };
  },
  computed: {
    answers() {
      let correctAnswer = this.quizList[this.currentQuestion - 1].translation;
      let translationList = [correctAnswer];
      this.correctAnswer = correctAnswer;

      while (translationList.length < 4) {
        let index = Math.floor(Math.random() * this.words.length);
        let translation = this.words[index].translation;

        if (!translationList.includes(translation)) {
          translationList.push(translation);
        }
      }

      let index = Math.floor(Math.random() * translationList.length);
      [translationList[0], translationList[index]] = [
        translationList[index],
        translationList[0]
      ];

      return translationList;
    }
  },
  methods: {
    checkAnswer(e, answer) {
      let correct = false;

      if (e.target.dataset.answer === this.correctAnswer) {
        correct = true;
      }

      this.$refs.buttons.forEach(button => {
        button.disabled = true;

        button.dataset.answer === this.correctAnswer
          ? (button.style.background = "#28a745")
          : (button.style.background = "#dc3545");
      });

      setTimeout(() => {
        this.$emit("nextQuestion", correct);
      }, 1500);
    }
  }
};
</script>

<style lang="scss" scoped>
.question {
  width: 100%;
}
.title {
  margin-bottom: 35px;
  padding: 0 150px 0 10px;
}
.question-number {
  position: absolute;
  right: 40px;
  top: 50px;
  font-size: 18px;
}
.bold {
  font-weight: bold;
}
.word {
  text-align: center;
  font-weight: bold;
  margin-bottom: 40px;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.btn {
  flex-basis: 35%;
  margin: 0 20px 35px 20px;
  font-size: 20px;
  font-weight: 500;
  min-width: 240px;
}
</style>

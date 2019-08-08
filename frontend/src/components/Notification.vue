<template>
  <transition-group appear name="slide-fade" tag="div" class="notification">
    <div v-if="successMsg" key="success" class="alert alert-success alert-dismissible">
      <strong>{{ successMsg }}</strong>
      <button @click="clearSuccessMsg" type="button" class="close">
        <span>&times;</span>
      </button>
    </div>
    <div v-if="errorMsg" key="error" class="alert alert-danger alert-dismissible">
      <strong>{{ errorMsg }}</strong>
      <button @click="clearErrorMsg" type="button" class="close">
        <span>&times;</span>
      </button>
    </div>
  </transition-group>
</template>

<script>
import store from "../../store/store";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      successTimeout: null,
      errorTimeout: null
    };
  },
  computed: {
    ...mapState({
      successMsg: "successMsg",
      errorMsg: "errorMsg"
    })
  },
  methods: {
    ...mapMutations({
      clearSuccessMsg: "clearSuccessMsg",
      clearErrorMsg: "clearErrorMsg"
    })
  },
  watch: {
    successMsg: {
      handler(val) {
        if (val) {
          clearTimeout(this.successTimeout);

          this.successTimeout = setTimeout(() => {
            this.clearSuccessMsg();
          }, 4000);
        }
      },
      immediate: true
    },
    errorMsg: {
      handler(val) {
        if (val) {
          clearTimeout(this.errorTimeout);

          this.errorTimeout = setTimeout(() => {
            this.clearErrorMsg();
          }, 4000);
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.notification {
  position: absolute;
  min-width: 350px;
  text-align: center;
  top: 85px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter {
  opacity: 0;
  transform: translateY(-5px);
}
.slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>

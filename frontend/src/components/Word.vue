<template>
  <tr>
    <th scope="row">{{ word.name }}</th>
    <td>{{ word.translation }}</td>
    <td>{{ word.partOfSpeech }}</td>
  </tr>
  <!-- <button
    @click="modalVisible = !modalVisible"
    type="button"
    class="btn btn-primary"
  >Launch demo modal</button>

  <transition name="modal">
    <keep-alive>
      <modal v-if="modalVisible" :modalVisible="modalVisible" @modal-close="modalVisible = false">
        <template slot="title">My tytle</template>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, accusamus?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, accusamus?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, accusamus?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, accusamus?</p>
      </modal>
    </keep-alive>
  </transition>-->
</template>

<script>
export default {
  components: {
    modal: () =>
      import(/* webpackChunkName: "modal" */ "@/components/Modal.vue")
  },
  props: ["word"],
  data() {
    return {
      modalVisible: false
    };
  }
};
</script>

<style lang="scss" scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease-out;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>

<template>
  <div>
    <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <slot name="title"></slot>
            </h5>
            <button @click="$emit('modal-close')" type="button" class="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <div @click.stop="$emit('modal-close')" class="modal-backdrop"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    modalVisible: Boolean
  }
};
</script>

<style lang="scss" scoped>
.modal {
  display: block;
  pointer-events: none;
  animation: slide-down 0.2s ease-out;
}
.modal-backdrop {
  opacity: 0.5;
  cursor: pointer;
}
@keyframes slide-down {
  from {
    transform: translateY(-20px) scale(1.2);
  }
  to {
    transform: translateY(0) scale(1);
  }
}
</style>

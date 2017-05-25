<template>
  <div class="ui dimmer modals page transition fade sm-modal" :class="{active: shown}">
    <div class="ui standard modal transition scrolling fade" :class="[animate, {active: shown, in: shown, out: !shown || animating}]"
      :style="{width: width + 'px'}">
      <i class="close icon" v-if="closable" @click="onCancelClick"></i>
      <div class="header">
        <slot name="modal-header">
          {{header}}
        </slot>
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="actions">
        <slot name="modal-actions">
          <div class="ui button deny cancel" @click.prevent="onCancelClick()">{{cancelText}}</div>
          <div class="ui positive right labeled icon button" @click.prevent="onOkClick()">
            {{okText}}
            <i class="checkmark icon"></i>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sm-modal',
    props: {
      shown: null,
      header: { type: String, default: '' },
      width: { type: Number, default: 500 },
      okText: { type: String, default: 'OK' },
      cancelText: { type: String, default: 'Cancel' },
      closable: { type: Boolean, default: true },
      animate: { type: String, default: 'horizontal' }
    },
    data() {
      return {
        animating: false
      };
    },
    methods: {
      onCancelClick() {
        this.animating = true;
        setTimeout(() => {
          this.$emit('update:shown', false);
          this.animating = false;
        }, 400);
        this.$emit('cancel');
      },
      onOkClick() {
        this.$emit('ok');
      }
    }
  };

</script>

<template>
  <label class="input"
    ><span class="input__label" v-if="label">{{ label }}</span
    ><input
      :value="value"
      :placeholder="placeholder"
      @input="e => $emit('input', e.target.value)"
      class="input__input"
      type="text"
      :readonly="readonly"
  /></label>
</template>
<script>
export default {
  name: 'AppInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss">
.input {
  display: block;
  &__label {
    @extend %label;
  }
  &__input {
    width: 100%;
    border: 2px solid black;
    background-color: $N0;
    outline: none;
    border-radius: 4px;
    height: 42px;
    @include text(calcRem(16px), 400, black);
    padding: 0 12px;
    &:focus {
      border-color: $Y300;
    }
  }
}
</style>

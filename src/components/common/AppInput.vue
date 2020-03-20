<template>
  <label class="input"
    ><span class="input__label" v-if="labels[type] || label">{{ labels[type] || label }}</span
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
import { labels } from '@/data';

export default {
  name: 'AppInput',
  props: {
    type: {
      type: String,
      validator(value) {
        return Object.keys(labels).indexOf(value) !== -1
      }
    },
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
  },
  data () {
    return {
      labels
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

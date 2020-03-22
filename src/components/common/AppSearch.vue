<template>
  <label class="search">
    <input
      :value="value"
      :placeholder="placeholder"
      @input="e => $emit('input', e.target.value)"
      class="search__input"
      type="text"/>
    <icon-search class="search__icon"
  /></label>
</template>
<script>
import { IconSearch } from '@/components/icons';

export default {
  name: 'AppSearch',
  components: {
    IconSearch
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  }
};
</script>
<style lang="scss">
$style: search;
.#{$style} {
  position: relative;
  @include flex(flex-start, center);
  &__input {
    height: 100%;
    width: 100%;
    border: 2px solid black;
    background-color: $N0;
    outline: none;
    border-radius: 4px;
    height: 42px;
    @include text(calcRem(16px), 400, black);
    padding: 0 12px 0 42px;
    @include transition(all);
    &:focus {
      border-color: $Y300;
      & + .#{$style}__icon {
        fill: $Y300;
      }
    }
  }
  &__icon {
    cursor: pointer;
    position: absolute;
    left: 10px;
    @include svg(24px, black);
  }
}
</style>

<template>
  <select class="select" :value='value' @change="onChange">
    <option class="select__option" v-for="item in list" :key="item.value" :value="item.value">{{ item.label }}</option>
  </select>
</template>

<script>
export default {
  name: 'AppSelect',
  props: {
    list: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    onChange(e) {
      this.$emit('change', e.target.value);
    }
  }
};
</script>
<style lang="scss">
.select {
  width: 220px;
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
</style>

<template>
  <div class="line" :style='{ height: `${height}px`, animationDirection: direction }'></div>
</template>
<script>
export default {
  name: 'AppLine',
  props: {
    height: {
      type: Number,
      default: 4
    },
    direction: {
      type: String,
      default: 'normal',
      validator: function (value) {
        return ['normal', 'reverse', 'alternate', 'alternate-reverse'].indexOf(value) !== -1
      }
    }
  }
}
</script>
<style lang="scss">
@keyframes LineColorAnimation {
  0% {
    background-position: 0% 81%;
  }
  50% {
    background-position: 100% 20%;
  }
  100% {
    background-position: 0% 81%;
  }
}
%animate-gradient {
  background: linear-gradient(90deg, $Y200, $G200, $B200, $R200, $Y200, $G200, $B200, $R200);
  background-size: 400% 400%;
  -webkit-animation: LineColorAnimation 20s ease infinite;
  -moz-animation: LineColorAnimation 20s ease infinite;
  animation: LineColorAnimation 20s ease infinite;
}
.line {
  @extend %animate-gradient;
  @include transition(all);
}
</style>

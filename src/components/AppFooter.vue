<template>
  <footer class="footer">
    <span class="footer__text">© 2020 Oleksandr Ratushnyi</span>
    <span ref="icon" class="footer__icon">🚀</span>
  </footer>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'AppFooter',
  mounted () {
    anime({
      targets: this.$refs.icon,
      translateY: [-4, 4],
      duration: 1000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    })
  }
}
</script>

<style lang="scss">
.footer {
  width: 100%;
  background-color: $N900;
  @include flex(flex-start, center);
  padding: 22px 24px 48px;
  @include media($screen-tablet) {
    padding-bottom: 24px;
  }
  &__text {
    @include text($H200, 300);
    margin-right: 6px;
    @include media($screen-tablet) {
      @include text($H400, 400);
    }
  }
  &__icon {
    transform: translateY(-4);
    transform: translateX(0);
  }
}
</style>

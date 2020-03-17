<template>
  <footer class="footer">
    <app-button class="footer__button">Предложить занятия</app-button>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="scss">
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    width: 100%;
    background: linear-gradient(0deg, $N900, $N900 20%,rgba(0, 0, 0, 0));
    @include flex(flex-end, stretch, column);
    padding: 0 24px 24px;
  }
</style>

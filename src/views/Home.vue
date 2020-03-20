<template>
  <div class="home">
    <div class="home__list">
      <card class='home__item' color='#36B37E'/>
      <card class='home__item' color='#FFC400'/>
      <card class='home__item' color='#2684FF'/>
      <card class='home__item' color='#FF7452'/>
      <card class='home__item' color='#8777D9'/>
    </div>
  </div>
</template>

<script>
import Card from '@/components/common/Card'

export default {
  name: 'Home',
  components: {
    Card
  }
}
</script>

<style lang="scss">
.home {
  padding: 24px;
  &__item {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
}
</style>

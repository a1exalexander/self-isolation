<template>
  <div class="home">
    <h2 class="home__title">Привет! Подились со всеми интересами и рекомендациями.</h2>
    <h2 class="home__title home__title--large">Happy Quarantine!</h2>
    <div class="home__list">
      <card class="home__item" v-for="post in posts" :post="post" :key="post.id" />
    </div>
  </div>
</template>

<script>
import Card from '@/components/common/Card';
import { db, eventBus, dbLocal } from '../services';
import { UPDATE_POSTS } from '../constants';

export default {
  name: 'Home',
  components: {
    Card
  },
  firestore: {
    posts: db.collection('posts')
  },
  data() {
    return {
      posts: [...dbLocal.getPostsSnapshot()]
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.home {
  padding: 24px;
  @extend %px;
  flex: 1 1;
  @include media {
    padding-top: 48px;
  }
  &__list {
    flex: 1 1;
    @include media($screen-tablet) {
      @include flex(space-between, flex-start);
      flex-wrap: wrap;
    }
  }
  &__title {
    @include text($H600, 600);
    text-align: center;
    margin-bottom: 12px;
    &--large {
      font-size: $H900;
      margin-bottom: 32px;
    }
    @include media {
      font-size: $H700;
      &--large {
        font-size: $H900;
        font-weight: 700;
        margin-bottom: 42px;
      }
    }
  }
  &__item {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
    @include media($screen-tablet) {
      min-width: 340px;
      margin-bottom: 24px;
      margin-left: 12px;
      margin-right: 12px;
      flex: 1 1;
    }
  }
}
</style>

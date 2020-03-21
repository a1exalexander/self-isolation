<template>
  <div class="home">
    <h2 class="home__title">Привет! Подились со всеми интересами и рекомендациями.</h2>
    <h2 class="home__title home__title--large">Happy Quarantine!</h2>
    <div class="home__list">
      <card class="home__item" v-for="post in getPosts" :post="post" :filter='filter' :key="post.id" />
    </div>
    <back-to-top bottom="50px" right="50px">
      <back-top-button />
    </back-to-top>
  </div>
</template>

<script>
import BackToTop from 'vue-backtotop';
import Card from '@/components/common/Card';
import { db, eventBus, dbLocal, bus } from '../services';
import { UPDATE_POSTS, UPDATE_FILTER, UPDATE_SORT } from '../constants';
import BackTopButton from '@/components/common/BackTopButton';

export default {
  name: 'Home',
  components: {
    Card,
    BackToTop,
    BackTopButton
  },
  firestore: {
    posts: db.collection('posts')
  },
  data() {
    return {
      posts: [...dbLocal.getPostsSnapshot()],
      filter: 'all',
      sort: 'date'
    };
  },
  computed: {
    getPosts() {
      const shallowCopy = [...this.posts];
      return shallowCopy
        .sort((a, b) =>
          this.sort === 'date' ? b.date.seconds - a.date.seconds : b[this.sort] - a[this.sort]
        )
        .filter(item => this.filter === 'all' || item[this.filter]);
    }
  },
  created() {
    bus.$on(UPDATE_FILTER, value => {
      this.filter = value;
    });
    bus.$on(UPDATE_SORT, value => {
      this.sort = value;
    });
  }
};
</script>

<style lang="scss">
.home {
  padding: 24px;
  padding-top: 152px;
  @extend %px;
  flex: 1 1;
  @include media($screen-tablet-small) {
    padding-top: 102px;
  }
  @include media {
    padding-top: 42px;
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

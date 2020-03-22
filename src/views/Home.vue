<template>
  <section class="home">
    <h2 class="home__title">Привет! Поделись со всеми интересами и рекомендациями.</h2>
    <h2 class="home__title home__title--large">Happy Quarantine!</h2>
    <transition-group name="flip" class="home__list" tag="div">
      <card
        class="home__item"
        v-for="post in getPosts"
        :post="post"
        :filter="filter"
        :key="post.id"
      />
    </transition-group>
  </section>
</template>

<script>
import Card from '@/components/common/Card';
import { db, eventBus, dbLocal, bus, logger } from '../services';
import { UPDATE_POSTS, UPDATE_FILTER, UPDATE_SORT } from '../constants';
import { seo } from '../data';

export default {
  name: 'Home',
  components: {
    Card
  },
  metaInfo: {
    title: seo.title,
    titleTemplate: null
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
        .filter(({ likes, dislikes, name, movies, books, todo, food, games, music, extra }) => {
          return (
            !(likes < 0) ||
            !(dislikes < 0) ||
            [movies, books, todo, food, games, music, extra].every(
              subItem => !String(subItem).trim()
            ) ||
            String(name).trim()
          );
        })
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
  @extend %padding-with-gears;
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

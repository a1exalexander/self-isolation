<template>
  <main id="app" class="app" :style="{ paddingTop: getPadding }">
    <app-header
      :height-default="heightDefault"
      :height-active="heightActive"
      :menu="menu"
      @toggle-menu="toggleMenu"
      @hide-menu="hideMenu"
    />
    <transition name="fade" appear mode="out-in">
      <router-view class="app__view" />
    </transition>
    <app-footer />
    <BackTopButton />
  </main>
</template>

<script>
import BackTopButton from '@/components/common/BackTopButton';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import { seo } from './data';

export default {
  name: 'App',
  metaInfo: {
    titleTemplate: `%s | ${seo.title}`,
    meta: [
      { name: 'title', content: seo.title },
      { name: 'description', content: seo.keywords },
      { name: 'keywords', content: seo.description },
      { name: 'og:title', content: seo.titleRu },
      { name: 'og:description', content: seo.description },
      { name: 'og:url', content: seo.website },
      { name: 'og:site', content: seo.title },
      { name: 'og:site_name', content: seo.title },
      { name: 'og:type', content: 'website' },
      { name: 'og:image', content: seo.image },
      { name: 'twitter:card', content: seo.twitter.card },
      { name: 'twitter:title', content: seo.titleRu },
      { name: 'twitter:description', content: seo.description },
      { name: 'twitter:creator', content: seo.twitter.username },
      { name: 'twitter:site', content: seo.twitter.username },
      { name: 'twitter:image', content: seo.twitter.image },
      { name: 'twitter:image:src', content: seo.twitter.image }
    ]
  },
  components: {
    AppHeader,
    AppFooter,
    BackTopButton
  },
  data() {
    return {
      heightDefault: 60,
      heightActive: 252,
      menu: false
    };
  },
  methods: {
    toggleMenu() {
      this.menu = !this.menu;
    },
    showMenu() {
      this.menu = true;
    },
    hideMenu() {
      this.menu = false;
    }
  },
  computed: {
    getPadding() {
      const DEFAULT_HEIGHT = this.heightDefault + 4;
      return this.menu ? `${DEFAULT_HEIGHT + this.heightActive}px` : `${DEFAULT_HEIGHT}px`;
    }
  },
  watch: {
    $route(route) {
      const timer = setTimeout(() => {
        this.menu = false;
        clearTimeout(timer);
      }, 300);
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log('sdsad');
    next();
  }
};
</script>

<style lang="scss">
.app {
  min-height: 100vh;
  @include flex-col;
  @include transition(all);
  transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);
  @include media {
    padding-top: 0 !important;
  }
  &__view {
    flex: 1;
    background-color: $N800;
    @include transition(all);
  }
}
</style>

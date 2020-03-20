<template>
  <nav class="navigation">
    <div class="navigation__box" :style="{ height: `${heightDefault}px` }">
      <h1 class="navigation__title">
        <img class="navigation__icon" src="@/assets/svg/isolate.svg" alt="" /> Self Isolation
      </h1>
      <navigation-menu class="navigation__desktop-menu" />
      <button
        class="navigation__burger burger"
        :class="{ _active: menu }"
        @click="$emit('toggle-menu')"
      >
        <span class="burger__item"></span>
        <span class="burger__item"></span>
        <span class="burger__item"></span>
      </button>
    </div>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      @after-leave="afterLeave"
      :css="false"
    >
      <navigation-menu class="navigation__menu" v-show="menu" />
    </transition>
    <app-line class="navigation__line" />
  </nav>
</template>

<script>
import anime from 'animejs';
import NavigationMenu from './navigation/NavigationMenu';

export default {
  name: 'AppNavigation',
  components: {
    NavigationMenu
  },
  props: {
    heightDefault: {
      type: Number,
      required: true
    },
    heightActive: {
      type: Number,
      required: true
    },
    menu: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.height = 0;
    },
    afterLeave(el) {
      el.style.height = 0;
    },
    enter(el, done) {
      anime({
        targets: el,
        height: this.heightActive,
        duration: 200,
        easing: 'easeInOutSine',
        complete: done
      });
    },
    leave(el, done) {
      anime({
        targets: el,
        height: 0,
        duration: 200,
        easing: 'easeInOutSine',
        complete: done
      });
    }
  }
};
</script>

<style scoped lang="scss">
$style: navigation;
.#{$style} {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: z-index(navigation);
  background-color: transparent;
  @include media {
    position: sticky;
  }
  &__title {
    @include text($H800, 600);
    @include flex(flex-start, flex-end);
  }
  &__box {
    position: relative;
    z-index: 2;
    @include flex(space-between, center);
    background-color: $N900;
    @extend %px;
    @include media {
      padding-top: 42px;
      padding-bottom: 42px;
    }
  }
  &__icon {
    height: 36px;
    margin-right: 8px;
  }
  &__menu {
    will-change: height;
    @include media {
      display: none;
    }
  }
  &__desktop-menu {
    display: none;
    @include media {
      display: flex;
    }
  }
  &__list {
    border-radius: 4px;
    margin-bottom: 24px;
    padding: 24px 24px 0;
  }
  &__link {
    @include flex(flex-start, center);
    padding: 12px;
    border-radius: 4px;
    @include transition(all);
    cursor: pointer;
    &.router-link-active {
      background-color: $N800;
    }
    &:active {
      background-color: $N900;
    }
  }
  &__link-icon {
    height: 30px;
    margin-right: 12px;
  }
  &__link-text {
    @include text($H600, 600);
  }
  &__button-wrapper {
    padding: 0 24px 24px;
  }
  &__line {
    display: block;
  }
  &__burger {
    @include media {
      display: none !important;
    }
  }
}
$style: burger;
.#{$style} {
  height: 18px;
  width: 32px;
  @include flex(space-between, stretch, column);
  cursor: pointer;
  &__item {
    height: 2px;
    background-color: $N0;
    border-radius: 2px;
    width: 100%;
    @include transition(all);
  }
  &._active {
    .#{$style}__item {
      &:nth-child(1) {
        width: 95%;
      }
      &:nth-child(2) {
        width: 55%;
      }
      &:nth-child(3) {
        width: 85%;
      }
    }
  }
}
</style>

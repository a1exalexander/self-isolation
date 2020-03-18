<template>
  <nav class="navigation">
    <div class="navigation__box" :style="{ height: `${heightDefault}px` }">
      <h1 class="navigation__title">
        <img class="navigation__icon" src="@/assets/svg/isolate.svg" alt="" /> Что делать...
      </h1>
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
    <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" :css="false">
      <div class="navigation__menu" v-if="menu">
        <ul class="navigation__list">
          <router-link tag="li" exact class="navigation__link" :to="{ name: 'Home' }"
            ><img class="navigation__link-icon" src="@/assets/svg/chat.svg" alt="" /><span
              class="navigation__link-text"
              >Главная</span
            ></router-link
          >
          <router-link tag="li" exact class="navigation__link" :to="{ name: 'About' }"
            ><img class="navigation__link-icon" src="@/assets/svg/book.svg" alt="" /><span
              class="navigation__link-text"
              >Описание</span
            ></router-link
          >
        </ul>
        <app-button>Предложить занятие</app-button>
      </div>
    </transition>
    <div class="navigation__line"></div>
  </nav>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'AppNavigation',
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
    beforeEnter (el) {
      el.style.maxHeight = 0
    },
    enter (el, done) {
      anime({
        targets: el,
        maxHeight: [0, `${this.heightActive}px`],
        delay: (el, i) => i * 100,
        duration: 200,
        easing: 'easeInOutSine',
        complete: done
      })
    },
    leave (el, done) {
      anime({
        targets: el,
        maxHeight: 0,
        delay: (el, i) => i * 100,
        duration: 200,
        easing: 'easeInOutSine',
        complete: done
      })
    }
  }
}
</script>

<style scoped lang="scss">
@-webkit-keyframes AnimationName {
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
@-moz-keyframes AnimationName {
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
@keyframes AnimationName {
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
  -webkit-animation: AnimationName 20s ease infinite;
  -moz-animation: AnimationName 20s ease infinite;
  animation: AnimationName 20s ease infinite;
}
$style: navigation;
.#{$style} {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: z-index(navigation);
  background-color: transparent;
  &__title {
    @include text($H800, 600);
    @include flex(flex-start, flex-end);
  }
  &__box {
    position: relative;
    z-index: 2;
    padding: 0 24px;
    @include flex(space-between, center);
    background-color: $N900;
  }
  &__icon {
    height: 36px;
    margin-right: 8px;
  }
  &__menu {
    position: relative;
    z-index: 1;
    background-color: $N700;
    padding: 24px;
    overflow: hidden;
    will-change: max-height;
  }
  &__list {
    border-radius: 4px;
    margin-bottom: 24px;
  }
  &__link {
    @include flex(flex-start, center);
    padding: 12px;
    border-radius: 4px;
    @include transition(all);
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
  &__line {
    display: block;
    height: 4px;
    @extend %animate-gradient;
    @include transition(all);
  }
}
$style: burger;
.#{$style} {
  height: 18px;
  width: 32px;
  @include flex(space-between, stretch, column);
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

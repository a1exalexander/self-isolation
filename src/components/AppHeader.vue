<template>
  <header class="header">
    <div class="header__box" :style="{ height: `${heightDefault}px` }">
      <router-link :to="{ name: 'Home' }" class="header__link-title">
        <h1 class="header__title">
          <p class="hidden-text">
            Чем заняться на карантине? Поделись со всеми интересным и полезным! Например, посоветуй
            хороший фильм 🎥, книгу 📖, видеоигру 🎮 или блюдо 🍕, которое можно приготовить дома.
          </p>
          <img class="header__icon" src="@/assets/svg/isolate.svg" alt="" />Счастливой Самоизоляции!
        </h1>
      </router-link>
      <navigation-menu class="header__desktop-menu" />
      <button
        class="header__burger burger"
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
      <navigation-menu class="header__menu" v-show="menu" />
    </transition>
    <app-line class="header__line" />
    <div class="header__gears" v-if="$route.name === 'Home'" key="home">
      <app-select
        class="header__select"
        :list="sorts"
        :value="sort"
        @change="onSortChange"
      ></app-select>
      <app-select
        class="header__select"
        :list="filters"
        :value="filter"
        @change="onFilterChange"
      ></app-select>
    </div>
    <div class="header__gears" v-if="$route.name === 'Info'" key="info">
      <app-search v-model.trim="search" class="header__search" />
      <h2 class="header__gears-title">COVID-19 Online</h2>
    </div>
  </header>
</template>

<script>
import AppSelect from './common/AppSelect';
import AppSearch from './common/AppSearch';
import { bus } from '../services';
import { UPDATE_FILTER, UPDATE_SORT, UPDATE_SEARCH } from '../constants';
import anime from 'animejs';
import NavigationMenu from './navigation/NavigationMenu';

export default {
  name: 'AppHeader',
  components: {
    NavigationMenu,
    AppSelect,
    AppSearch
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
  data() {
    return {
      filters: [
        { value: 'all', label: 'Показать все' },
        { value: 'movies', label: '🎥 Фильмы, сериалы, передачи' },
        { value: 'books', label: '📖 Книги, статьи...' },
        { value: 'todo', label: '⏳ Как полезно убить время' },
        { value: 'food', label: '🍕 Еда' },
        { value: 'games', label: '🎮 Видеоигры и настольные игры' },
        { value: 'music', label: '🎵 Музыка' },
        { value: 'extra', label: '⚡ Дополнительно' }
      ],
      sorts: [
        { value: 'date', label: 'Сначала новые' },
        { value: 'likes', label: 'Сначала популярные' },
        { value: 'dislikes', label: 'Сначала не популярные' }
      ],
      filter: 'all',
      sort: 'date',
      search: ''
    };
  },
  methods: {
    onFilterChange(value) {
      this.filter = value;
      bus.$emit(UPDATE_FILTER, value);
    },
    onSortChange(value) {
      this.sort = value;
      bus.$emit(UPDATE_SORT, value);
    },
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
  },
  watch: {
    search(value) {
      bus.$emit(UPDATE_SEARCH, value);
    }
  }
};
</script>

<style scoped lang="scss">
$style: header;
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
  &__search {
    width: 100%;
    @include media($screen-tablet) {
      width: 320px;
    }
  }
  &__link-title {
    display: inline-block;
    margin-right: 12px;
    flex: 1 1;
  }
  &__title {
    @include text($H400, 600);
    @include flex(flex-start, center);
    font-weight: 700;
    @include media($screen-iphone-plus) {
      font-size: $H500;
    }
    @include media($screen-tablet-small) {
      font-size: $H800;
    }
    @include media {
      font-size: $H700;
    }
    @include media($screen-fullhd) {
      font-size: $H800;
    }
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
    height: 42px;
    margin-right: 8px;
    @include media {
      height: 52px;
    }
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
      overflow: visible;
      display: flex;
      flex: 1 0;
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
  &__gears {
    position: sticky;
    background-color: $N900;
    top: 64px;
    right: 0;
    left: 0;
    @extend %px;
    padding-top: 16px;
    padding-bottom: 16px;
    @include flex(space-between, stretch, column);
    @include media($screen-tablet-small) {
      flex-direction: row;
    }
    @include media($screen-tablet) {
      justify-content: flex-start;
    }
    @include media {
      top: 84px;
    }
  }
  &__gears-title {
    display: none;
    @include media($screen-tablet) {
      margin-left: 24px;
      @include text($H900, 700);
      text-transform: uppercase;
      align-self: center;
      padding-bottom: 3px;
      display: inline-block;
    }
  }
  &__select {
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    @include media($screen-tablet-small) {
      width: 220px;
      &:not(:last-child) {
        margin-bottom: 0;
        margin-right: 16px;
      }
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

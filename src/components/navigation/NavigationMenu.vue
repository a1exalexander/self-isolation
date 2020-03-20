<template>
  <div class="navigation-menu">
    <ul class="navigation-menu__list">
      <router-link tag="li" exact class="navigation-menu__link" :to="{ name: 'Home' }"
        ><img class="navigation-menu__link-icon" src="@/assets/svg/chat.svg" alt="" /><span
          class="navigation-menu__link-text"
          >Главная</span
        ></router-link
      >
      <router-link tag="li" exact class="navigation-menu__link" :to="{ name: 'About' }"
        ><img class="navigation-menu__link-icon" src="@/assets/svg/book.svg" alt="" /><span
          class="navigation-menu__link-text"
          >Описание</span
        ></router-link
      >
    </ul>
    <div class="navigation-menu__button-wrapper">
      <router-link :to="{ name: 'Post' }">
        <app-button>Предложить занятие</app-button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NavigationMenu'
};
</script>
<style lang="scss">
.navigation-menu {
  position: relative;
  z-index: 1;
  background-color: $N700;
  overflow: hidden;
  @include media {
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
  }
  &__list {
    border-radius: 4px;
    margin-bottom: 24px;
    padding: 24px 24px 0;
    @include media {
      @include flex;
      padding: 0;
      margin-bottom: 0;
      margin-right: 32px;
    }
  }
  &__link {
    @include flex(flex-start, center);
    padding: 12px;
    border-radius: 4px;
    @include transition(all);
    cursor: pointer;
    @include media {
      padding: 10px 18px;
      &:not(:last-child) {
        margin-right: 18px;
      }
    }
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
    @include media {
      padding: 0;
    }
  }
}
</style>

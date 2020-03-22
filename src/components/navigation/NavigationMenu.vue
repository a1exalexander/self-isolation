<template>
  <div class="navigation-menu">
    <nav class="navigation-menu__list">
      <router-link exact class="navigation-menu__link" :to="{ name: 'Home' }"
        ><img class="navigation-menu__link-icon" src="@/assets/svg/home-heart.svg" alt="" /><span
          class="navigation-menu__link-text"
          >Главная</span
        ></router-link
      >
      <router-link exact class="navigation-menu__link" :to="{ name: 'About' }"
        ><img class="navigation-menu__link-icon" src="@/assets/svg/book.svg" alt="" /><span
          class="navigation-menu__link-text"
          >Описание</span
        ></router-link
      >
      <router-link exact class="navigation-menu__link" :to="{ name: 'Info' }"
        ><img class="navigation-menu__link-icon" src="@/assets/svg/virus2.svg" alt="" /><span
          class="navigation-menu__link-text"
          >COVID-19</span
        ></router-link
      >
    </nav>
    <div class="navigation-menu__button-wrapper">
      <app-button @click='() => $router.push({ name: "Post" })'>Предложить занятие</app-button>
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
      margin-right: 24px;
    }
  }
  &__link {
    @include flex(flex-start, center);
    padding: 10px;
    border-radius: 4px;
    @include transition(all);
    cursor: pointer;
    @include media {
      padding: 8px 10px;
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
    @include media($screen-fullhd) {
      padding: 8px 12px;
      &:not(:last-child) {
        margin-right: 12px;
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
    height: 28px;
    margin-right: 8px;
  }
  &__link-text {
    @include text($H500, 600);
    white-space: nowrap;
  }
  &__button-wrapper {
    padding: 0 24px 24px;
    @include media {
      padding: 0;
    }
  }
}
</style>

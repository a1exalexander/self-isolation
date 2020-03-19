<template>
  <div class="post">
    <p class="post__description">
      Привет! Поделись со всеми интересным и полезным! Например, посветуй хороший фильм, книгу,
      видеоигру или блюдо, которое можно приготовить дома
    </p>
    <form class="post__form" action="/">
      <app-input class="post__input" label='@ Твое Имя' />
      <app-input class="post__input" label='🎥 Фильмы, сериалы, передачи...' />
      <app-input class="post__input" label='📖 Книги, статьи...' />
      <app-input class="post__input" label='⏳ Как полезно убить время' />
      <app-input class="post__input" label='🍕 Какое блюдо в самый раз' />
      <app-input class="post__input" label='🎮 Видеоигры и настольные игры' />
      <app-input class="post__input" label='🎵 Музыка' />
      <app-input class="post__input" label='⚡ Дополнительно' />
    </form>
    <app-button type='secondary'>Send</app-button>
  </div>
</template>

<script>
export default {
  name: 'Post'
}
</script>

<style lang="scss">
.post {
  padding: 24px;
  &__description {
    @include text($H500);
    line-height: 1.5;
    margin-bottom: 24px;
  }
  &__form {
    margin-bottom: 24px;
  }
  &__input {
    &:not(:last-of-type) {
      margin-bottom: 12px;
    }
  }
}
</style>

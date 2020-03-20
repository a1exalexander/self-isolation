<template>
  <div class="post">
    <p class="post__description">
      Привет! Поделись со всеми интересным и полезным! Например, посветуй хороший фильм, книгу,
      видеоигру или блюдо, которое можно приготовить дома
    </p>
    <form class="post__form" action="/">
      <app-input class="post__input" v-model="input.name" label="@ Твое Имя" />
      <app-input
        class="post__input"
        v-model="input.movies"
        label="🎥 Фильмы, сериалы, передачи..."
      />
      <app-input class="post__input" v-model="input.books" label="📖 Книги, статьи..." />
      <app-input class="post__input" v-model="input.todo" label="⏳ Как полезно убить время" />
      <app-input class="post__input" v-model="input.food" label="🍕 Какое блюдо в самый раз" />
      <app-input class="post__input" v-model="input.games" label="🎮 Видеоигры и настольные игры" />
      <app-input class="post__input" v-model="input.music" label="🎵 Музыка" />
      <app-input class="post__input" v-model="input.extra" label="⚡ Дополнительно" />
      <span class="post__label">🎨 Цвет карточки</span>
      <colorpicker
        :value="input.color"
        @input="onChangeColor"
        class="post__colors"
        :palette="colors"
      ></colorpicker>
      <app-button :disabled="disabled" class="post__button" type="secondary">Send</app-button>
    </form>
    <span class="post__caption">Предпросмотр</span>
    <card :post="input" />
  </div>
</template>

<script>
import { Compact } from 'vue-color';
import { colors } from '@/utils';
import Card from '../components/common/Card';

export default {
  name: 'Post',
  components: {
    colorpicker: Compact,
    Card
  },
  data() {
    return {
      input: {
        color: colors[0],
        name: '',
        movies: '',
        books: '',
        todo: '',
        food: '',
        games: '',
        music: '',
        extra: ''
      },
      colors
    };
  },
  computed: {
    disabled() {
      const { input } = this;
      return !(
        input.name &&
        [
          !!input.movies,
          !!input.books,
          !!input.todo,
          !!input.food,
          !!input.games,
          !!input.music,
          !!input.extra
        ].includes(true)
      );
    }
  },
  methods: {
    onChangeColor(color) {
      this.input.color = color.hex;
    }
  }
};
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
    margin-bottom: 48px;
  }
  &__label {
    @extend %label;
  }
  &__input {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
  &__colors.vc-compact {
    width: 100%;
    margin-bottom: 24px;
    .vc-compact-color-item {
      @include size(46px);
    }
  }
  &__button {
    margin-top: 32px;
  }
  &__caption {
    @include text($H400, 600);
    display: block;
    margin-bottom: 24px;
  }
}
</style>

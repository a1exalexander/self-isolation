<template>
  <div class="post">
    <div class="post__container">
      <p class="post__description">
        Привет! Поделись со всеми интересным и полезным! Например, посветуй хороший фильм, книгу,
        видеоигру или блюдо, которое можно приготовить дома
      </p>
      <div class="post__form-wrapper">
        <form class="post__form" @submit.prevent="publish">
          <app-input class="post__input" :max-length="20" v-model.trim="input.name" type="name" />
          <app-input
            class="post__input"
            :max-length="50"
            v-model.trim="input.movies"
            type="movies"
          />
          <app-input class="post__input" :max-length="100" v-model.trim="input.books" type="books" />
          <app-input class="post__input" :max-length="200" v-model.trim="input.todo" type="todo" />
          <app-input class="post__input" :max-length="100" v-model.trim="input.food" type="food" />
          <app-input class="post__input" :max-length="100" v-model.trim="input.games" type="games" />
          <app-input class="post__input" :max-length="100" v-model.trim="input.music" type="music" />
          <app-input
            class="post__input"
            :max-length="200"
            v-model.trim="input.extra"
            type="extra"
          />
          <span class="post__label">🎨 Цвет карточки</span>
          <colorpicker
            :value="input.color"
            @input="onChangeColor"
            class="post__colors"
            :palette="colors"
          ></colorpicker>
          <app-button :loading="loading" :disabled="disabled" class="post__button" type="secondary"
            >Опубликовать</app-button
          >
        </form>
        <span class="post__caption">Предпросмотр</span>
        <card readonly :post="input" />
      </div>
    </div>
  </div>
</template>

<script>
import { Compact } from 'vue-color';
import { colors } from '@/utils';
import Card from '../components/common/Card';
import { logger, db, Timestamp } from '../services';
import { dateNow, getValidColor } from '../utils';

const init = {
  color: colors[0],
  name: '',
  movies: '',
  books: '',
  todo: '',
  food: '',
  games: '',
  music: '',
  extra: '',
  likes: 0,
  dislikes: 0,
  date: { seconds: Date.now() / 1000 }
};

export default {
  name: 'Post',
  components: {
    colorpicker: Compact,
    Card
  },
  metaInfo: {
    title: 'Публикация'
  },
  data() {
    return {
      loading: false,
      input: { ...init },
      colors
    };
  },
  computed: {
    disabled() {
      const { input } = this;
      return (
        input.likes !== 0 ||
        input.dislikes !== 0 ||
        !input.name ||
        ![
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
    },
    clean() {
      this.input = { ...init };
    },
    async publish() {
      if (this.disabled) return;
      this.loading = true;
      try {
        const data = {
          ...this.input,
          color: getValidColor(this.input.color),
          date: Timestamp.fromDate(new Date())
        };
        const res = await db.collection('posts').add(data);
        logger.info(res);
        this.clean();
      } catch (err) {
        logger.error(err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss">
.post {
  &__container {
    padding-top: 24px;
    padding-bottom: 24px;
    @extend %px;
    @extend %container;
  }
  &__form-wrapper {
    @include media {
      max-width: 500px;
      margin: 0 auto;
    }
  }
  &__description {
    @include text($H500);
    line-height: 1.5;
    margin-bottom: 24px;
    @include media($screen-desktop) {
      text-align: center;
      font-size: $H600;
    }
  }
  &__form {
    margin-bottom: 48px;
  }
  &__label {
    @extend %label;
    margin-bottom: 8px;
  }
  &__input {
    &:not(:last-child) {
      margin-bottom: 12px;
      @include media($screen-desktop) {
        margin-bottom: 18px;
      }
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
    @include media {
      margin: 32px auto 0;
    }
  }
  &__caption {
    @include text($H400, 600);
    display: block;
    margin-bottom: 16px;
  }
}
</style>

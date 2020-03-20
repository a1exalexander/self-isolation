<template>
  <article
    class="card"
    :class="{ _active: open }"
    :style="{ backgroundColor: post.color }"
    @click="open = true"
  >
    <header class="card__header">
      <div class="card__info">
        <h3 class="card__autor">@{{ post.name }}</h3>
        <span class="card__date">{{getDate}}</span>
      </div>
      <div class="card__like-wrapper" @click.stop>
        <button class="card__like like-btn">
          <icon-heart class="like-btn__icon" /><span class="like-btn__text">{{
            post.likes || 0
          }}</span>
        </button>
        <button class="card__like like-btn">
          <icon-broken-heart class="like-btn__icon like-btn__icon--dislike" /><span
            class="like-btn__text"
            >{{ post.dislikes || 0 }}</span
          >
        </button>
      </div>
    </header>
    <app-line :height="2" direction="reverse" />
    <ul class="card__list">
      <li title="Фильмы, сериалы, передачи..." class="card__item" v-if="post.movies">
        <span class="card__label" role="img" aria-label="movies">🎥</span>
        <p class="card__text">{{ post.movies }}</p>
      </li>
      <li title="Книги" class="card__item" v-if="post.books">
        <span class="card__label" role="img" aria-label="books">📖</span>
        <p class="card__text">{{ post.books }}</p>
      </li>
      <li title="Чем заняться свободное время" class="card__item" v-if="post.todo">
        <span class="card__label" role="img" aria-label="time">⏳</span>
        <p class="card__text">{{ post.todo }}</p>
      </li>
      <li title="Еда" class="card__item" v-if="post.food">
        <span class="card__label" role="img" aria-label="food">🍕</span>
        <p class="card__text">{{ post.food }}</p>
      </li>
      <li title="Игры" class="card__item" v-if="post.games">
        <span class="card__label" role="img" aria-label="food">🎮</span>
        <p class="card__text">{{ post.games }}</p>
      </li>
      <li title="Музыка" class="card__item" v-if="post.music">
        <span class="card__label" role="img" aria-label="food">🎵</span>
        <p class="card__text">{{ post.music }}</p>
      </li>
      <li title="Дополниельно" class="card__item" v-if="post.extra">
        <span class="card__label" role="img" aria-label="food">⚡</span>
        <p class="card__text">{{ post.extra }}</p>
      </li>
    </ul>
  </article>
</template>

<script>
import { IconHeart, IconBrokenHeart } from '../icons';
import { dateNow } from '../../utils';

export default {
  name: 'Card',
  components: {
    IconHeart,
    IconBrokenHeart
  },
  props: {
    post: {
      type: Object,
      default() {
        return {
          color: '',
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
          date: ''
        };
      }
    }
  },
  data() {
    return {
      open: false
    };
  },
  computed: {
    getDate() {
      return this.date || dateNow();
    }
  }
};
</script>

<style lang="scss">
$style: card;
.#{$style} {
  border-radius: 4px;
  @include transition(all);
  &__header {
    padding: 8px 12px;
    @include flex(space-between, center);
    border-radius: 4px 4px 0 0;
  }
  &__autor {
    display: block;
    width: 100%;
    @include text($H500, 600, $N00);
    margin-right: 12px;
  }
  &__date {
    @include text($H300, 400, $N00);
    display: none;
    @include media($screen-iphone-plus) {
      display: block;
    }
  }
  &__list {
    padding: 12px;
    border-radius: 0 0 4px 4px;
  }
  &__item {
    @include flex;
    @include text($H400, 600, black);
    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }
  &__text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &__label {
    display: block;
    flex: 0 0 30px;
  }
  &__info {
    @include flex(flex-start, baseline);
  }
  &__like-wrapper {
    @include flex(center, center);
  }
  &__like {
    &:not(:last-of-type) {
      margin-right: 16px;
    }
  }
  &._active {
    .#{$style}__text {
      text-overflow: clip;
      overflow: visible;
      white-space: normal;
    }
  }
}

$style: like-btn;
.#{$style} {
  @include flex(center, center);
  @include media {
    &:hover {
      .#{$style}__icon {
        fill: lighten($P1, 10%);
        &--dislike {
          fill: lighten($N100, 10%);
        }
      }
    }
  }
  &:active {
    .#{$style}__icon {
      fill: darken($P1, 10%);
      &--dislike {
        fill: darken($N100, 10%);
      }
    }
  }
  &__icon {
    @include svg(24px, $N0);
    margin-right: 4px;
  }
  &__text {
    min-width: 18px;
  }
}
</style>

<template>
  <article
    class="card"
    :class="{ _active: open }"
    :style="{ backgroundColor: color }"
    @click="open = true"
  >
    <header class="card__header">
      <div class="card__info">
        <h3 class="card__autor">@Сашко</h3>
        <span class="card__date">18.03.2020</span>
      </div>
      <div class="card__like-wrapper" @click.stop>
        <button class="card__like like-btn">
          <icon-heart class="like-btn__icon" /><span class="like-btn__text">111</span>
        </button>
        <button class="card__like like-btn">
          <icon-broken-heart class="like-btn__icon like-btn__icon--dislike" /><span class="like-btn__text">1</span>
        </button>
      </div>
    </header>
    <app-line :height="2" direction="reverse" />
    <ul class="card__list">
      <li title="Фильмы, сериалыб передачи" class="card__item">
        <span class="card__label" role="img" aria-label="movies">🎥</span>
        <p class="card__text">Один дома, Крепкий орешек, Один дома, Крепкий орешек</p>
      </li>
      <li title="Книги" class="card__item">
        <span class="card__label" role="img" aria-label="books">📖</span>
        <p class="card__text">
          Властелин колец
        </p>
      </li>
      <li title="Чем заняться свободное время" class="card__item">
        <span class="card__label" role="img" aria-label="time">⏳</span>
        <p class="card__text">
          Сходить на вылазку в магаз
        </p>
      </li>
      <li title="Еда" class="card__item">
        <span class="card__label" role="img" aria-label="food">🍕</span>
        <p class="card__text">
          Хлопья с молоком
        </p>
      </li>
      <li title="Игры" class="card__item">
        <span class="card__label" role="img" aria-label="food">🎮</span>
        <p class="card__text">
          Red Dead Redemption 2
        </p>
      </li>
      <li title="Музыка" class="card__item">
        <span class="card__label" role="img" aria-label="food">🎵</span>
        <p class="card__text">
          Linkin Park
        </p>
      </li>
      <li title="Дополниельно" class="card__item">
        <span class="card__label" role="img" aria-label="food">⚡</span>
        <p class="card__text">
          Смотреть в потолок
        </p>
      </li>
    </ul>
  </article>
</template>

<script>
import { IconHeart, IconBrokenHeart } from '../icons'

export default {
  name: 'Card',
  components: {
    IconHeart,
    IconBrokenHeart
  },
  props: {
    color: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      open: false
    }
  }
}
</script>

<style lang="scss">
$style: card;
.#{$style} {
  border-radius: 4px;
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

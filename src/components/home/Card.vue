<template>
  <li class="card" :class="{ _active: open }" :style='{ backgroundColor: color }' @click="open = true">
    <header class="card__header">
      <h3 class="card__autor">@Сашко</h3>
      <span class="card__date">18.03.2020</span>
    </header>
    <!-- <app-line :height="2" direction="reverse" /> -->
    <ul class="card__list">
      <li class="card__item">
        <span class="card__label" role="img" aria-label="movies">🎥</span>
        <p class="card__text">Один дома, Крепкий орешек, Один дома, Крепкий орешек</p>
      </li>
      <li class="card__item">
        <span class="card__label" role="img" aria-label="books">📖</span>
        <p class="card__text">
          Ведьмак
        </p>
      </li>
      <li class="card__item">
        <span class="card__label" role="img" aria-label="time">⏳</span>
        <p class="card__text">
          Накачать прээссс
        </p>
      </li>
      <li class="card__item">
        <span class="card__label" role="img" aria-label="food">🍕</span>
        <p class="card__text">
          Хлопья с молоком
        </p>
      </li>
      <li class="card__item">
        <span class="card__label" role="img" aria-label="food">🎮</span>
        <p class="card__text">
          Red Dead Redemption 2
        </p>
      </li>
      <li class="card__item">
        <span class="card__label" role="img" aria-label="food">🎵</span>
        <p class="card__text">
          Linkin Park
        </p>
      </li>
      <li class="card__item">
        <span class="card__label" role="img" aria-label="food">⚡</span>
        <p class="card__text">
          Смотреть в потолок
        </p>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'Card',
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
    border-bottom: 2px solid $N0;
  }
  &__autor {
    display: block;
    width: 100%;
    @include text($H500, 600, $N00);
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
  &._active {
    .#{$style}__text {
      text-overflow: clip;
      overflow: visible;
      white-space: normal;
    }
  }
}
</style>

<template>
  <section class="about">
    <div class="about__container">
      <h2 class="about__text">
        Привет! Это место, где собраны советы и рекомендации свобоного время провождения, в частости в
        период самоизоляции и карантина.
      </h2>
      <p class="about__text">
        Поделись со всеми интересным и полезным! Например, посветуй хороший фильм 🎥, книгу 📖,
        видеоигру 🎮 или блюдо 🍕, которое можно приготовить дома
      </p>

      <p class="about__caption">Как это сделать?</p>
      <article class="about__step">
        <div class="about__row">
          <img class="about__arrow about__arrow--first" src="@/assets/svg/arrow.svg" alt="" />
          <p class="about__label">Жми на кнопку</p>
        </div>
        <app-button>Предложить занятие</app-button>
      </article>
      <article class="about__step">
        <div class="about__row about__row--end">
          <div class="about__arrow-wrapper">
            <img class="about__arrow" src="@/assets/svg/arrow.svg" alt="" />
          </div>
          <p class="about__label">Предложи что то</p>
        </div>
        <app-input class="about__input" readonly :value="post.movies" type="movies" />
        <app-input class="about__input" readonly :value="post.books" type="books" />
        <app-input class="about__input" readonly :value="post.todo" type="todo" />
        <app-input class="about__input" readonly :value="post.food" type="food" />
        <app-input class="about__input" readonly :value="post.games" type="games" />
        <app-input class="about__input" readonly :value="post.music" type="music" />
        <app-input class="about__input" readonly :value="post.extra" type="extra" />
      </article>
      <article class="about__step">
        <div class="about__row">
          <img class="about__arrow about__arrow--first" src="@/assets/svg/arrow.svg" alt="" />
          <p class="about__label">Появится такая карточка</p>
        </div>
        <card readonly color="#FF7452" :post="post" />
      </article>
    </div>
  </section>
</template>
<script>
import Card from '@/components/common/Card';

export default {
  name: 'About',
  components: {
    Card
  },
  data() {
    return {
      post: {
        name: 'Сашко',
        color: '#FF7452',
        movies: 'Интерстеллар, Мир Дикого Запада (3 сезон)',
        books: 'Джон Р.Р. Толкин - Хоббит',
        todo: 'Лежать на диване',
        food: 'Килька в тамотном соусе',
        games: 'PS4 - Red Dead Redemption 2',
        music: 'Макс Корж - Малолетка',
        extra: 'Скупить стратегичесские запасы грэчки',
        likes: 177,
        dislikes: 7,
        date: '19.03.2020'
      }
    };
  }
};
</script>
<style lang="scss">
@keyframes ArrowRotateFirst {
  0% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}
@keyframes ArrowRotateSecond {
  0% {
    transform: rotate(100deg);
  }
  50% {
    transform: rotate(140deg);
  }
  100% {
    transform: rotate(100deg);
  }
}
$style: about;
.#{$style} {
  padding-top: 48px;
  padding-bottom: 48px;
  @extend %px;
  &__container {
    @extend %container;
    @include media($screen-desktop) {
      @include flex(flex-start, center, column);
    }
  }
  &__text {
    text-align: center;
    @include text($H600);
    line-height: 1.4;
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
  &__row {
    @include flex(space-between, center);
    margin-bottom: 22px;
    @include media($screen-desktop) {
      margin-bottom: 32px;
      justify-content: flex-start;
      &--end {
        justify-content: flex-end;
      }
    }
  }
  &__caption {
    text-align: center;
    @include text($H900, 600);
    margin-bottom: 48px;
  }
  &__label {
    @include text($H700, 600);
  }
  &__input {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
  &__step {
    margin-bottom: 48px;
    &:nth-of-type(1),
    &:nth-of-type(3) {
      .#{$style}__arrow {
        margin-right: 24px;
        animation: ArrowRotateFirst 3s ease infinite;
        animation-timing-function: ease-in-out;
      }
    }
    &:nth-of-type(2) {
      .#{$style}__arrow-wrapper {
        transform: rotateX(180deg);
        order: 2;
      }
      .#{$style}__arrow {
        animation: ArrowRotateSecond 3s ease infinite;
        animation-timing-function: ease-in-out;
      }
    }
    @include media($screen-desktop) {
      min-width: 400px;
    }
  }
  &__arrow {
    @include size(60px);
    margin-left: 24px;
    &--first {
      margin-left: 0;
      margin-right: 24px;
      animation: ArrowRotateFirst 3s ease infinite;
      animation-timing-function: ease-in-out;
    }
  }
}
</style>

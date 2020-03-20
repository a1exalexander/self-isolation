<template>
  <div class="about">
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
        <img class="about__arrow" src="@/assets/svg/arrow.svg" alt="" />
        <p class="about__label">Жми на кнопку</p>
      </div>
      <app-button>Предложить занятие</app-button>
    </article>
    <article class="about__step">
      <div class="about__row">
        <div class="about__arrow-wrapper">
          <img class="about__arrow" src="@/assets/svg/arrow.svg" alt="" />
        </div>
        <p class="about__label">Предложи что то</p>
      </div>
      <app-input readonly label='🎥 Фильмы, сериалы, передачи...' value='Властелин колец'/>
    </article>
    <article class="about__step">
      <div class="about__row">
        <img class="about__arrow" src="@/assets/svg/arrow.svg" alt="" />
        <p class="about__label">Появится такая карточка</p>
      </div>
      <card color='#FF7452' />
    </article>
  </div>
</template>
<script>
import Card from '@/components/common/Card'

export default {
  name: 'About',
  components: {
    Card
  }
}
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
  padding: 48px 24px;
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
    margin-bottom: 18px;
  }
  &__caption {
    text-align: center;
    @include text($H900, 600);
    margin-bottom: 48px;
  }
  &__label {
    @include text($H700, 600);
  }
  &__step {
    margin-bottom: 48px;
    &:nth-of-type(1), &:nth-of-type(3) {
      .#{$style}__arrow {
        margin-right: 24px;
        animation: ArrowRotateFirst 3s ease infinite;
        animation-timing-function: ease-in-out;
      }
    }
    &:nth-of-type(2) {
      .#{$style}__arrow-wrapper {
        transform: rotateX(180deg);
        margin-right: 24px;
        order: 2;
      };
      .#{$style}__arrow {
        animation: ArrowRotateSecond 3s ease infinite;
        animation-timing-function: ease-in-out;
      }
    }
  }
  &__arrow {
    @include size(60px);
    &--first {
      margin-right: 24px;
      animation: ArrowRotateFirst 3s ease infinite;
      animation-timing-function: ease-in-out;
    }
  }
}
</style>

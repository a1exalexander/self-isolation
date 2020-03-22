<template>
  <section class="info">
    <h2 class="info__title">COVID-19 Online</h2>
    <transition name="fade">
      <div v-show="!search">
        <h3 class="info__subtitle">Глобальные данные</h3>
        <ul class="info__global">
          <li class="info__global-item info__global-item--warning">
            <span class="info__label">Всего случаев</span>
            <span class="info__value">{{ animatedCases | numeralFormat }}</span>
          </li>
          <li class="info__global-item info__global-item--danger">
            <span class="info__label">Смертей</span>
            <span class="info__value">{{ animatedDeaths | numeralFormat }}</span>
          </li>
          <li class="info__global-item info__global-item--success">
            <span class="info__label">Выздоровлений</span>
            <span class="info__value">{{ animatedRecovered | numeralFormat }}</span>
          </li>
        </ul>
      </div>
    </transition>
    <h3 class="info__subtitle">Данные по странам</h3>
    <transition-group name="flip" class="info__list" tag="ul">
      <li class="info__item" v-for="item in getCountries" :key="item.country">
        <h4 class="info__country">{{ item.country }}</h4>
        <div class="info__row">
          <p class="info__stat">
            Всего случаев: <span class="info__stat--bold">{{ item.cases | numeralFormat }}</span> |
            Сегодня:
            <span class="info__stat--bold">{{ item.todayCases | numeralFormat }}</span>
          </p>
        </div>
        <div class="info__row">
          <p class="info__stat">
            Смертей: <span class="info__stat--bold">{{ item.deaths | numeralFormat }}</span> |
            Сегодня:
            <span class="info__stat--bold">{{ item.todayDeaths | numeralFormat }}</span>
          </p>
        </div>
        <div class="info__row">
          <p class="info__stat">
            Выздоровлений:
            <span class="info__stat--bold">{{ item.recovered | numeralFormat }}</span>
          </p>
        </div>
      </li>
    </transition-group>
  </section>
</template>
<script>
import { TweenLite } from 'gsap';
import { covidService, bus } from '../services';
import { UPDATE_SEARCH } from '../constants';

export default {
  name: 'Info',
  metaInfo: {
    title: 'COVID-19 ONLINE'
  },
  data() {
    return {
      countries: [...covidService.getCountriesSnapshot()],
      search: '',
      cases: covidService.getGlobalSnapshot().cases,
      deaths: covidService.getGlobalSnapshot().deaths,
      recovered: covidService.getGlobalSnapshot().recovered
    };
  },
  computed: {
    getCountries() {
      return this.countries.filter(
        ({ country }) =>
          !this.search ||
          String(country)
            .toLowerCase()
            .includes(String(this.search).toLowerCase())
      );
    },
    animatedCases() {
      return this.cases.toFixed(0);
    },
    animatedDeaths() {
      return this.deaths.toFixed(0);
    },
    animatedRecovered() {
      return this.recovered.toFixed(0);
    }
  },
  async created() {
    bus.$on(UPDATE_SEARCH, value => {
      this.search = value;
    });
    console.log(covidService.getGlobalSnapshot());
    const { cases, deaths, recovered } = await covidService.getGlobal();
    TweenLite.to(this.$data, 2, { cases, deaths, recovered });
    this.countries = [...(await covidService.getAll())];
  }
};
</script>
<style lang="scss">
.info {
  @extend %padding-with-gears;
  padding-top: 102px;
  @include media {
    padding-top: 42px;
  }
  @include flex(flex-start, stretch, column);
  &__title {
    @include text($H900, 700);
    text-align: center;
    margin-bottom: 24px;
    @include media($screen-tablet) {
      display: none;
    }
  }
  &__subtitle {
    @include text($H600, 300);
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 18px;
  }
  &__global {
    width: 100%;
    @include flex(flex-start, stretch, column);
    list-style: none;
    margin-bottom: 24px;
    @include media($screen-tablet-small) {
      flex-direction: row;
      justify-content: center;
      max-width: 800px;
      margin: 0 auto 24px;
    }
  }
  &__global-item {
    flex: 1 1 100px;
    padding: 24px;
    border-radius: 4px;
    @include flex(flex-start, center, column);
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    @include media($screen-tablet-small) {
      &:not(:last-child) {
        margin-bottom: 0;
        margin-right: 24px;
      }
    }
    &--warning {
      background-color: $Y200;
    }
    &--danger {
      background-color: $R200;
    }
    &--success {
      background-color: $G200;
    }
  }
  &__label {
    @include text($H300, 300, black);
    text-transform: uppercase;
    line-height: 1;
    margin-bottom: 10px;
  }
  &__value {
    @include text($H900, 700, black);
    line-height: 1;
  }
  &__list {
    list-style: none;
    @include flex(space-between);
    flex-wrap: wrap;
  }
  &__item {
    @include flex(flex-start, flex-start, column);
    flex: 1 1;
    margin: 0 12px 24px;
    padding: 12px 24px;
    background-color: $N80;
    border-radius: 4px;
  }
  &__country {
    margin-bottom: 2px;
  }
  &__row {
    &:not(:last-child) {
      margin-bottom: 2px;
    }
  }
  &__stat {
    white-space: nowrap;
    @include text($H400, 400, black);
    &--bold {
      font-weight: 700;
    }
  }
}
</style>

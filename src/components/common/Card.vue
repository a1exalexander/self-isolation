<template>
  <article
    class="card"
    :class="{ _active: open, _filtered: filter !== 'all' }"
    :style="{ backgroundColor: getColor }"
    @click="open = true"
  >
    <header class="card__header">
      <div class="card__info">
        <h3 class="card__autor">@{{ post.name | truncate(20) }}</h3>
        <span class="card__date">{{ getDate }}</span>
      </div>
      <div class="card__like-wrapper" @click.stop v-if="!readonly">
        <button class="card__like like-btn" @click="onLike">
          <icon-heart class="like-btn__icon" :class="{ _active: like }" /><span
            class="like-btn__text"
            >{{ post.likes || 0 }}</span
          >
        </button>
        <button class="card__like like-btn" @click="onDislike">
          <icon-broken-heart
            class="like-btn__icon like-btn__icon--dislike"
            :class="{ _active: dislike }"
          /><span class="like-btn__text">{{ post.dislikes || 0 }}</span>
        </button>
      </div>
    </header>
    <app-line :height="2" direction="reverse" />
    <ul class="card__list">
      <li
        v-if="!!post.movies && ['all', 'movies'].includes(filter)"
        key="movies"
        title="Фильмы, сериалы, передачи..."
        class="card__item"
      >
        <span class="card__label" role="img" aria-label="movies">🎥</span>
        <p class="card__text">{{ post.movies | truncate(50) }}</p>
      </li>
      <li
        v-if="!!post.books && ['all', 'books'].includes(filter)"
        key="books"
        title="Книги"
        class="card__item"
      >
        <span class="card__label" role="img" aria-label="books">📖</span>
        <p class="card__text">{{ post.books | truncate(50) }}</p>
      </li>
      <li
        v-if="!!post.todo && ['all', 'todo'].includes(filter)"
        key="todo"
        title="Чем заняться свободное время"
        class="card__item"
      >
        <span class="card__label" role="img" aria-label="time">⏳</span>
        <p class="card__text">{{ post.todo | truncate(100) }}</p>
      </li>
      <li
        v-if="!!post.food && ['all', 'food'].includes(filter)"
        key="food"
        title="Еда"
        class="card__item"
      >
        <span class="card__label" role="img" aria-label="food">🍕</span>
        <p class="card__text">{{ post.food | truncate(50) }}</p>
      </li>
      <li
        v-if="!!post.games && ['all', 'games'].includes(filter)"
        key="games"
        title="Игры"
        class="card__item"
      >
        <span class="card__label" role="img" aria-label="food">🎮</span>
        <p class="card__text">{{ post.games | truncate(50) }}</p>
      </li>
      <li
        v-if="!!post.music && ['all', 'music'].includes(filter)"
        key="music"
        title="Музыка"
        class="card__item"
      >
        <span class="card__label" role="img" aria-label="food">🎵</span>
        <p class="card__text">{{ post.music | truncate(50) }}</p>
      </li>
      <li
        v-if="!!post.extra && ['all', 'extra'].includes(filter)"
        key="extra"
        title="Дополниельно"
        class="card__item"
      >
        <span class="card__label" role="img" aria-label="extra">⚡</span>
        <p class="card__text">{{ post.extra | truncate(100) }}</p>
      </li>
    </ul>
  </article>
</template>

<script>
import { IconHeart, IconBrokenHeart } from '../icons';
import { dateNow, formatDate, colors, getValidColor } from '../../utils';
import { likeStorage, db, eventBus, logger } from '../../services';
import { UPDATE_POSTS } from '../../constants';

export default {
  name: 'Card',
  components: {
    IconHeart,
    IconBrokenHeart
  },
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    filter: {
      type: String,
      default: 'all'
    },
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
      open: false,
      like: likeStorage.hasLike(this.post?.id),
      dislike: likeStorage.hasDislike(this.post?.id)
    };
  },
  methods: {
    increment(num) {
      return Number.isNaN(Number(num)) ? 1 : Number(num) + 1;
    },
    onLike() {
      const {
        like,
        post: { id, likes }
      } = this;
      if (like) {
        return;
      }
      db.collection('posts')
        .doc(id)
        .update({ likes: this.increment(likes) })
        .then(() => {
          logger.info('Liked');
          this.like = true;
          likeStorage.saveLike(id);
        });
    },
    async onDislike() {
      const {
        dislike,
        post: { id, dislikes }
      } = this;
      if (dislike) {
        return;
      }
      db.collection('posts')
        .doc(id)
        .update({ dislikes: this.increment(dislikes) })
        .then(() => {
          logger.info('Disliked');
          this.dislike = true;
          likeStorage.saveDislike(id);
        });
    }
  },
  computed: {
    getDate() {
      return formatDate(this.post?.date?.seconds);
    },
    getColor() {
      return getValidColor(this.post.color);
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
    @include media($screen-tablet) {
      padding: 12px 16px;
    }
  }
  &__autor {
    display: block;
    width: 100%;
    @include text($H500, 700, $N00);
    margin-bottom: 4px;
  }
  &__date {
    @include text($H300, 400, $N00);
  }
  &__list {
    padding: 16px;
    border-radius: 0 0 4px 4px;
  }
  &__item {
    @include flex;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
  &__text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    @include text($H500, 600, black);
    word-break: break-word;
    @include media($screen-tablet) {
      text-overflow: clip;
      white-space: normal;
      overflow: visible;
    }
  }
  &._filtered {
    .#{$style}__text {
      text-overflow: clip;
      white-space: normal;
      overflow: visible;
    }
  }
  &__label {
    display: block;
    flex: 0 0 30px;
  }
  &__info {
    @include flex(flex-start, flex-start, column);
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
  @include flex(flex-start, center);
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
    @include svg(28px, $N0);
    margin-right: 6px;
    &._active {
      fill: $P1;
    }
    &--dislike {
      &._active {
        fill: $O1;
      }
    }
  }
  &__text {
    min-width: 22px;
    text-align: left;
    @include text($H500, 700, black);
  }
}
</style>

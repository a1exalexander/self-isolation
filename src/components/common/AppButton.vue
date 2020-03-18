<template>
  <button
    class="button"
    :class='[type, { "_loading": loading, "_fluid": fluid }]'
    :disabled='disabled'
    @click='click'
  >
    <span class='button__text'><slot /></span>
    <slot name="icon" v-if="emoji"><span class='button__icon' role='img' aria-label="icon">{{emoji}}</span></slot>
    <svg
      class='button__loading'
      focusable='false'
      viewBox='0 0 20 20'
    >
      <circle cx='10' cy='10' r='9' />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'secondary', 'danger'].indexOf(value) !== -1
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    emoji: {
      type: String,
      default: ''
    },
    fluid: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
  @-webkit-keyframes ButtonSpinner {
  to {
    transform: rotate(360deg);
  }
}
@keyframes ButtonSpinner {
  to {
    transform: rotate(360deg);
  }
}

$style: button;

$names: 'primary', 'secondary', 'danger';

$bg: (
  'primary': $G300,
  'secondary': $Y300,
  'danger': $R300,
);
$bg-hover: (
  'primary': $G200,
  'secondary': $Y200,
  'danger': $R200,
);
$bg-active: (
  'primary': $G400,
  'secondary': $Y400,
  'danger': $R400,
);
$bg-disabled: (
  'primary': $N30,
  'secondary': $N30,
  'danger': $N30,
);
$color: (
  'primary': $N0,
  'secondary': $N0,
  'danger': $N0,
);
$color-hover: (
  'primary': $N0,
  'secondary': $N0,
  'danger': $N0,
);
$color-active: (
  'primary': $N0,
  'secondary': $N0,
  'danger': $N0,
);
$color-disabled: (
  'primary': $N60,
  'secondary': $N60,
  'danger': $N60,
);
$border: (
  'primary': $G300,
  'secondary': $Y300,
  'danger': $R300,
);
$border-hover: (
  'primary': $G200,
  'secondary': $Y200,
  'danger': $R200,
);
$border-active: (
  'primary': $G400,
  'secondary': $Y400,
  'danger': $R400,
);
$border-disabled: (
  'primary': $N300,
  'secondary': $N300,
  'danger': $N300,
);
$loading: (
  'primary': $N0,
  'secondary': $N0,
  'danger': $N0,
);

.#{$style} {
  cursor: pointer;
  border-radius: 2px;
  padding: 0px 16px;
  min-height: 42px;
  position: relative;
  border: 0px solid transparent;
  @include flex(center, center);
  box-shadow: $SH1;
  @include transition(all);
  &__text {
    @include text($H500, 600, $N0);
    @include transition(all);
  }
  &__icon {
    text-transform: none;
    font-style: normal;
    @include text($H500, 600, $N0);
    @include transition(all);
    margin-right: 6px;
    line-height: 1;
  }
  svg.#{$style}__icon {
    @include svg(14px, $N0);
  }
  &__loading {
    display: none;
    position: absolute;
    @include svg(22px);
    fill: none;
    stroke-dasharray: 42px;
    stroke-dashoffset: 44px;
    stroke-width: 2px;
    z-index: 1;
    stroke-linecap: round;
    animation: 0.86s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite ButtonSpinner;
  }
  &._extra {
    padding-right: 32px + 16px;
    .#{$style}__extra {
      display: flex;
    }
  }
  &._loading {
    color: transparent;
    cursor: not-allowed;
    pointer-events: none;
    > *:not(.#{$style}__loading) {
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
    }
  }
  &._fluid {
    width: 100%;
    @include media {
      width: fit-content;
    }
  }
  @each $name in $names {
    &.secondary {
      border-width: 1px;
    }
    &.#{$name} {
      background-color: map-get($bg, $name);
      border-color: map-get($border, $name);
      .#{$style}__text {
        color: map-get($color, $name);
      }
      .#{$style}__extra {
        color: map-get($color, $name);
        border-color: map-get($border, $name);
      }
      .#{$style}__icon {
        color: map-get($color, $name);
        fill: map-get($color, $name);
      }
      .#{$style}__loading {
        stroke: map-get($loading, $name);
      }
    }
    @include media($screen-desktop) {
      &.#{$name}:hover {
        background-color: map-get($bg-hover, $name);
        border-color: map-get($border-hover, $name);
        .#{$style}__text {
          color: map-get($color-hover, $name);
        }
        .#{$style}__extra {
          color: map-get($color-hover, $name);
          border-color: map-get($border-hover, $name);
        }
        .#{$style}__icon {
          color: map-get($color-hover, $name);
          fill: map-get($color-hover, $name);
        }
      }
    }
    &.#{$name}:active {
      background-color: map-get($bg-active, $name);
      border-color: map-get($border-active, $name);
      box-shadow: none;
      .#{$style}__text {
        color: map-get($color-active, $name);
      }
      .#{$style}__extra {
        color: map-get($color-active, $name);
        border-color: map-get($border-active, $name);
      }
      .#{$style}__icon {
        color: map-get($color-active, $name);
        fill: map-get($color-active, $name);
      }
    }
    &.#{$name}:disabled {
      background-color: map-get($bg-disabled, $name);
      border-color: map-get($border-disabled, $name);
      box-shadow: none;
      cursor: not-allowed;
      .#{$style}__text {
        color: map-get($color-disabled, $name);
      }
      .#{$style}__extra {
        color: map-get($color-disabled, $name);
        border-color: map-get($border-disabled, $name);
      }
      .#{$style}__icon {
        color: map-get($color-disabled, $name);
        fill: map-get($color-disabled, $name);
      }
    }
    &.#{$name}._loading {
      .#{$style}__loading {
        visibility: visible;
        opacity: 1;
        display: block;
      }
    }
  }
}
</style>

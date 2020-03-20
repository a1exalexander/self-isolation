<template>
  <div id="app" class="app" :style="{ paddingTop: getPadding }">
    <app-navigation
      :height-default="heightDefault"
      :height-active="heightActive"
      :menu="menu"
      @toggle-menu="toggleMenu"
      @hide-menu="hideMenu"
    />
    <router-view class="app__view" />
    <app-footer />
  </div>
</template>

<script>
import AppNavigation from '@/components/AppNavigation'
import AppFooter from '@/components/AppFooter'

export default {
  name: 'App',
  components: {
    AppNavigation,
    AppFooter
  },
  data () {
    return {
      heightDefault: 60,
      heightActive: 222,
      menu: false
    }
  },
  methods: {
    toggleMenu () {
      this.menu = !this.menu
    },
    showMenu () {
      this.menu = true
    },
    hideMenu () {
      this.menu = false
    }
  },
  computed: {
    getPadding () {
      const DEFAULT_HEIGHT = this.heightDefault + 4
      return this.menu ? `${DEFAULT_HEIGHT + this.heightActive}px` : `${DEFAULT_HEIGHT}px`
    }
  },
  watch: {
    $route (route) {
      const timer = setTimeout(() => {
        this.menu = false
        clearTimeout(timer)
      }, 300)
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log('sdsad')
    next()
  }
}
</script>

<style lang="scss">
.app {
  min-height: 100vh;
  @include flex-col;
  @include transition(all);
  transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);
  @include media {
    padding-top: 0 !important;
  }
  &__view {
    flex: 1;
    background-color: $N800;
    @include transition(all);
  }
}
</style>

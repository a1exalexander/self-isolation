<template>
  <div id="app" class="app" :style='{ paddingTop: getPadding }'>
    <app-navigation :height-default='heightDefault' :height-active='heightActive' :menu='menu' @toggle-menu='toggleMenu' />
    <router-view class="app__view"/>
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
      return this.menu ? `${this.heightDefault + this.heightActive + 4}px` : `${this.heightDefault + 4}px`
    }
  }
}
</script>

<style lang="scss">
.app {
 &__view {
   background-color: $N800;
   min-height: 100vh;
   @include transition(all);
 }
}
</style>

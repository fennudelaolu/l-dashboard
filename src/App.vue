<template>
  <div id="app">
    <router-view></router-view>
    <svgicon></svgicon>
  </div>
</template>

<script>
import layout from './page/layout'
import svgicon from "./svg/svg-icon"

export default {
  name: 'App',
  components: {
    layout,svgicon
  }
}
</script>

<style lang="scss">

</style>

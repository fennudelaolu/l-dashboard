<template>
  <div class="big-screen">
    <ShowScreen v-if="screen_option!=null"
                :haveback="true"
                :drag_items="screen_option.drag_items"
                :drag_box_option="screen_option.drag_box_option"
    ></ShowScreen>
  </div>
</template>

<script>

  import ShowScreen from './ShowScreen.vue'

  export default {
    name: "BigScreen",
    components: { ShowScreen },
    props:{

    },
    data(){
      return {
        screen_option:null
      }
    },

    methods: {

    },
    mounted(){
      this.screen_option = this.$store.getters[this.$store_type.SCREEN_OPTION] ;
    },
    filters:{
    },
    computed:{
    },
    watch:{

    }

  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin";
  .big-screen{
    width: 100%;
    height: 100%;
  }
</style>

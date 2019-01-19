<template>
  <div>
    <Button @click="goMakeScreenPage">list</Button>
  </div>

</template>

<script>
  export default {
    name: "ScreentList",
    data(){
      return {
        folder_name:'文件夹1'
      }
    },
    methods: {
      goMakeScreenPage(){
        this.$router.push({ name: '大屏幕制作' , params: { target_forder_name:this.folder_name }})
      }
    },
    mounted(){

    },
    computed:{

    },
    watch:{

    }
  }

</script>

<style scoped>

</style>

<template>
  <div>
    <Button @click="goChartListPage">mark</Button>
    {{target_forder_name}}
    {{params}}
  </div>
</template>

<script>
    export default {
      name: "MakeChart",
      props:{
        params:{},
        ['target_forder_name']:{
          type:String
        },
      },
      data(){
          return {

          }
      },
      methods: {
        goChartListPage(){
          this.$router.push({ name: '图表列表' , params: {  }})
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

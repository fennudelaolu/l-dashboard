<template>
  <div>
    <Button @click="goChartListPage">mark</Button>
    {{target_forder_name}}
    {{params}}
  </div>
</template>

<script>
  import { Button} from 'iview'
    export default {
      name: "MakeChart",
      components:{ Button},
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

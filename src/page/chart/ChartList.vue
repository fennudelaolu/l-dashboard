<template>
    <div>
      <Button @click="goMakeChartPage">list</Button>
    </div>

</template>

<script>
  import { Button} from 'iview'
    export default {
      name: "ChartList",
      components:{ Button},
      data(){
        return {
          folder_name:'文件夹1'
        }
      },
      methods: {
        goMakeChartPage(){
          this.$router.push({ name: '图表制作' , params: { target_forder_name:this.folder_name }})
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

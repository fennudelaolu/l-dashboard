<template>
  <div :ref="'show-screen'" class="show-screen">
    <MDragbleBox style="margin: 0 auto;" v-if="com_drag_box_option!=null" :option="com_drag_box_option"  :have_border="false" >
      <MDragbleItem v-for="(item, i) in com_drag_items" :key="i" :index="i" :active_index="-1" :option="item.drag_option">

        <textarea v-if="item.type === 'text'" :style="item.style" v-model="item.value">
        </textarea>
        <MCart :w="item.drag_option.w" :h="item.drag_option.h" :option="item.option" v-if="item.type === 'chart'"></MCart>
      </MDragbleItem>
    </MDragbleBox>
  </div>
</template>

<script>
  import MDragbleBox from '../../components/mdragble/DragBox'
  import MDragbleItem from '../../components/mdragble/DragItem'
  import MCart from '../../components/M_Chart'

  export default {
    name: "MakeScreen",
    components: { MDragbleBox, MDragbleItem, MCart },
    props:{
      drag_box_option:{
        type:Object,
        default: null
      },
      drag_items:{
        type:Array,
        default:[]
      },

    },
    data(){
      return {
        com_drag_items:[],
        com_drag_box_option:null,
      }
    },

    methods: {
      //根据外边框计算缩放比例
      setZoom(){
        //获取原始大小
        let w = this.drag_box_option.style.width;
        let h = this.drag_box_option.style.height;
        //获取容器大小

        let box = this.$refs['show-screen'];

        let drag_zoom = 0;
        if(box){

          let box_h = this.$refs['show-screen'].offsetHeight
          let box_w = this.$refs['show-screen'].offsetWidth
          //计算适应大小
          let zoom_w = box_w / w;
          let zoom_h = box_h / h;
          if(zoom_w < zoom_h){
            drag_zoom = zoom_w
          } else {
            drag_zoom = zoom_h
          }
        }

        this.setCom_drag_items(drag_zoom);
        this.setCom_drag_box_option(drag_zoom);

      },
      //根据比例计算容器与容器内元素的大小
      setCom_drag_items(drag_zoom){
        let drag_items =  JSON.parse(JSON.stringify(this.drag_items));
        let z = drag_zoom;
        drag_items = drag_items.map((item, index)=>{
          let option = item.drag_option
          option.w *= z;
          option.h *= z;
          option.top *= z;
          option.left *= z;
          option.z = index;
          return item
        })
        this.com_drag_items = drag_items;

      },
      setCom_drag_box_option(drag_zoom){
        let z = drag_zoom;
        let option = JSON.parse(JSON.stringify(this.drag_box_option))
        option.style.width *= z;
        option.style.height *= z;
        this.com_drag_box_option = option
      }
    },
    mounted(){
      this.setZoom()
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
  .show-screen{
    width: 100%;
    height: 100%;
  }
</style>

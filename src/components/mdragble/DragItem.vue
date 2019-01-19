<template>
    <div :style="item_style" class="mdragble-item" dragtype="item" :item_index="index" dragitem>
      <!--缩放按钮-->
      <div ref="bar" v-show="isActive" class="mdragble-item-bar" :item_index="index" dragbar ></div>
      <slot ></slot>
    </div>
</template>

<script>
    export default {
      name: "DragItem",
      props:{
        option:{
          type: Object,
          default:{
            z:1,
            w:100,
            h:100,
            left:100,
            top:100,
          }
        },
        index:'',
        active_index:''
      },
      methods:{

      },
      computed: {
        item_style(){
          let z = this.option.z || 1;
          let w = this.option.w || 100;
          let h = this.option.h || 100;
          let left = this.option.left || 0;
          let top = this.option.top || 0;
          let background = this.option.background || '';

          let style = {
            width: w  + 'px',
            height: h  + 'px',
            left: left + 'px',
            top: top + 'px',
            'z-index': z ,
            border:this.isActive? '1px dashed ' : '0px dashed ',
            background:background,
            //'background-color':'#aaa'
          }
          return style;
        },
        //当前容器是否时活动状态
        isActive(){
          return this.active_index!='' &&  this.active_index == this.index
        }

      }
    }
</script>

<style lang="scss" scoped>

  .mdragble-item{
    position:absolute;
    cursor: move;
    background-color: #4F95DA;

    //缩放按钮
    &-bar{
      position:absolute;
      right:-3px;
      bottom:-3px;
      width:0;
      height:0;
      border-right: 5px solid;
      border-bottom: 5px solid;
      cursor: se-resize
    }
  }
</style>

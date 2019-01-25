<template>
    <div @mousedown.stop="createEvent($event,'move')" :style="item_style" class="mdragble-item" dragtype="item" :item_index="index" dragitem>
      <!--缩放按钮-->
      <div @mousedown.stop="createEvent($event,'resize')"  ref="bar" v-show="isActive" class="mdragble-item-bar" :item_index="index" dragbar ></div>
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
        createEvent(event, type){
          let mouse_x = event.x;
          let mouse_y = event.y;

          this.$parent.readyEvent(this.$el,mouse_x,mouse_y,type)
        },
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
            border:this.isActive? '1px dashed #aaa' : '0px dashed ',
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

    //缩放按钮
    &-bar{
      position:absolute;
      right:-3px;
      bottom:-3px;
      width:0;
      height:0;
      border-right: 5px solid #aaa;
      border-bottom: 5px solid #aaa;
      cursor: se-resize;
    }
  }
</style>

<template>
  <!--@mousedown="readyEvent($event)"-->
    <div   :style="box_style" class="mdragble-box" dragbox>
      <slot></slot>
    </div>
</template>

<script>

    export default {
      name: "DragBox",

      props:{
        option:{
          type:Object,
          default: {
            style:{
              width: 100,
              height: 100,
              background:'',
              'background-color': '',
            },

            have_border: true
          }
        }

      },
      data(){
        return {
          //记录鼠标起始位置
          mouse_x:0,
          mouse_y:0,
          //记录待调整容器信息
          active_index: '',
          active_item:{
            w:0,
            h:0,
            left:0,
            top:0
          },

        }
      },

      mounted() {
      },
      methods:{
        //注册事件，并记录当前操作dom
        readyEvent(act_node,mouse_x,mouse_y,type){

          //当前坐标
          this.mouse_x = mouse_x;
          this.mouse_y = mouse_y;

          if(type === 'move'){
            window.onmousemove = this.moveEvent;
          }else {
            window.onmousemove = this.resizeEvent
          }
          //松开鼠标清除事件
          window.onmouseup = this.cleanEvent
          //记录当前操作容器信息与索引
          this.active_item = {
            w: act_node.offsetWidth ,
            h: act_node.offsetHeight,
            max_w:this.option.style.width - act_node.offsetLeft,
            max_h:this.option.style.height - act_node.offsetTop,

            left: act_node.offsetLeft ,
            top: act_node.offsetTop,
            max_left:this.option.style.width - act_node.offsetWidth,
            max_top:this.option.style.height - act_node.offsetHeight,

          }

          this.active_index = act_node.getAttribute('item_index');

          //告诉父组件当前操作容器的索引
          this.$emit('clickItem',{active_index: this.active_index})
        },
        //移动：鼠标移动时回调
        moveEvent(event){
          //鼠标移动距离计算
          let left = (event.x - this.mouse_x) + this.active_item.left;
          let top = (event.y - this.mouse_y) + this.active_item.top;
          //超出边界取边界值
          if(left < 0){
            left = 0
          } else if(left > this.active_item.max_left){
            left = this.active_item.max_left
          }
          if(top < 0){
            top = 0
          } else if(top > this.active_item.max_top){
            top = this.active_item.max_top
          }
          //调整后信息传给回调函数
          this.$emit('move',{left, top, active_index:this.active_index})
        },
        //缩放：鼠标移动时回调
        resizeEvent(event){
          //鼠标移动距离计算
          let w = (event.x - this.mouse_x) + this.active_item.w;
          let h = (event.y - this.mouse_y) + this.active_item.h;
          //超出边界取边界值
          w = w > this.active_item.max_w? this.active_item.max_w : w
          h = h > this.active_item.max_h? this.active_item.max_h : h
          //调整后信息传给回调函数
          this.$emit('resize',{w, h, active_index:this.active_index})
        },
        //清除事件
        cleanEvent(){
          window.onmousemove = null
        },

      },

      computed:{
        box_style(){
          let w = this.option.style.width || 100;
          let h = this.option.style.height || 100;
          let have_border = this.option.have_border || true;

          return {
            width: w + 'px',
            height: h  + 'px',
            background: this.option.background || this.option.style.background_color,
            'background-color': this.option.style.background_color,
            border: have_border ? '1px solid' : ''
          }
        }
      },
      watch:{
      }
    }
</script>

<style lang="scss" scoped>

  .mdragble-box {
    position: relative;
  }
</style>

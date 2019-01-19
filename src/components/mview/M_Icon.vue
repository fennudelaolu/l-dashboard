<!--图标组件：
属性：
  size: 长宽 （自定义class可不填）
  color: 图标颜色
  type: 使用图标（在svg-icon.vue文件中）
待解决问题：
  1.依赖svg-icon文件，无法独立成单独插件
-->
<template>
  <svg  @click="onclick" :style=style class="mview-onmouse0">
    <use :href="type"  :fill="fill"></use>
  </svg>
</template>

<script>
    export default {
      name: "M_Icon",
      props:{
        size:{
          type: Number,
          default: 0,
          required: true,
          validator: function (value) {
            return value >= 0
          }
        },
        type:String,
        color:String,
        isbtn:{
          type: Boolean,
          default: false
        }
      },
      methods:{
        onclick(){
          this.$emit('click');
        }
      },
      computed: {
        style() {
          let v = parseInt(this.size) || 0;
          return v?{width: v,height:v,display:'inline-block'}:{};
        },
        fill(){
          let color = this.color || '#999';
          return color;
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import './common.scss';

</style>

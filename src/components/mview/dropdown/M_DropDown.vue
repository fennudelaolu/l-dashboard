<!--下拉框组件
依赖：无
props：
  @Array menu_list 下拉菜单 ：[{name:'显示的名字',value:'实际的值',disable:'是否禁止点击（默认false）'}]
slot：
  btn 下拉按钮
event：
  @chooseMenu 传入参数： menu_list[n]
-->
<template>
  <div class="m-dropdown">
    <div class="m-dropdown-rel" >
      <slot  name="btn">
        下拉菜单
        <M_Icon :size="12" type="#arrow1_down" color="#aaa" ></M_Icon>
      </slot>
    </div>

    <div slot="list">
      <ul class="m-dropdown-menu">
        <li v-for="(item, k) in menu_list" @click="chooseMenu($event,item)" :class="item | menuItemClass" :key="item.name+k" >{{item.name}}</li>
      </ul>
    </div>

  </div>
</template>

<script>
    export default {
      name: "M_DropDown",
      props:{
          menu_list:{
            type:Array,
            default: [
              {name:'yi1111111111111111111111', value:'1'},
              {name:'er', value:'2', disable:true,}
            ]
          }
      },
      methods:{
        chooseMenu(event,menu){
          let { disable } = menu
          if(disable){
            return;
          } else {
            this.$emit('chooseMenu',menu)
          }

        }
      },
      filters:{
        menuItemClass(v){
          v = v || {}
          let dis = v.disable || false
          console.log(dis)
          if(dis){
            return 'm-dropdown-item--dis'
          }else{
            return 'm-dropdown-item'
          }
          return 'm-dropdown-item'
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../../style/mixin";
  @import "../common";
  $font_color:#6A8CF0;

  .m-dropdown {
    position: relative;
    display: inline-block;
    cursor: pointer;

  }
  .m-dropdown:hover {

    .m-dropdown-rel {
      @include opacity(0.8)
    }
    .m-dropdown-menu {
      display: block;
    }
  }

  .m-dropdown-rel {
    font-size: 12px;
    line-height: 12px;
    font-weight: normal;
    color: $font_color;
  }

  //下拉菜单框
  .m-dropdown-menu {
    display: none;
    position: absolute;

    z-index: 2;

    padding: 5px 0;
    background-color: #fff;
    border: 1px solid #ccc;

    color: black;
    @include border-radius(3px);
    @include shadow(1px, 1px, 5px, #ccc);
  }

  //每个子选项
  .m-dropdown-item {
    font-size: 12px ;
    color: $mview-black;
    padding: 0 8px;
  }

  .m-dropdown-item--dis {
    font-size: 12px ;
    padding: 3px 8px;
    color: #aaa;
  }

  .m-dropdown-item:hover {
    background-color: #aaa;
    @include opacity(0.2);
  }

</style>

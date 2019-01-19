<template>
  <div class="layout">
    <header class="layout-header">
      <Header @save="saveScreen" @preview="previewScreen"  @addDragItem="addDragItem"
              @setZIndex="setZIndex"
              :active_index="drag_active_index">
      </Header>
    </header>

    <section class="layout-section make-screen">

      <div class="make-screen-left">
        <MDragbleBox :option="com_drag_box_option"  :have_border="true"  @clickItem="clickItem" @resize="resizeDrag" @move="moveDrag">

          <MDragbleItem v-for="(item, i) in com_drag_items" :key="i" :index="i" :active_index="drag_active_index" :option="item.drag_option">

            <textarea v-if="item.type === 'text'" :style="item.style" v-model="item.value">
            </textarea>
            <MCart :w="item.drag_option.w" :h="item.drag_option.h" :option="item.option" v-if="item.type === 'chart'"></MCart>
          </MDragbleItem>

        </MDragbleBox>
      </div>
      <div class="make-screen-center">
        <div class="title">页面样式</div>
        <Collapse v-model="value2" accordion>
          <Panel name="1">
            页面尺寸
            <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
          </Panel>
          <Panel name="2">
            页面背景
            <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
          </Panel>

        </Collapse>
      </div>
      <div class="make-screen-right">
        <div class="title">数据</div>
        <div class="title">
          <Select v-model="model7" style="width:200px">
            <OptionGroup label="Hot Cities">
              <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
            <OptionGroup label="Other Cities">
              <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
          </Select>
        </div>
        <Collapse v-model="value2" accordion>
          <Panel name="1">
            数据
            <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
          </Panel>

        </Collapse>

      </div>

    </section>
  </div>
</template>

<script>
  import Header from './Header'
  import MCart from '../../components/M_Chart'
  import MDragbleBox from '../../components/mdragble/DragBox'
  import MDragbleItem from '../../components/mdragble/DragItem'

  export default {
    name: "MakeScreen",
    components: {Header, MCart, MDragbleBox, MDragbleItem},
    props:{
      target_forder_name:{
        type:String
      },
    },
    data(){
      return {

        cityList: [
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Ottawa',
            label: 'Ottawa'
          },
          {
            value: 'Paris',
            label: 'Paris'
          },
          {
            value: 'Canberra',
            label: 'Canberra'
          }
        ],
        cityList1: [
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          }
        ],
        cityList2: [
          {
            value: 'Ottawa',
            label: 'Ottawa'
          },
          {
            value: 'Paris',
            label: 'Paris'
          },
          {
            value: 'Canberra',
            label: 'Canberra'
          }
        ],
        model7: '',


        /*--------mdragble容器------*/
        drag_zoom:1,      //缩放
        drag_box_option:{
          w: 500, h: 800,  have_border:true,
        },//容器外壳配置
        drag_items:[
          {
            drag_option:{w: 200 , h: 200, top: 50, left: 50}
          }
        ],    //容器列表
        drag_active_index:'',//当前活动容器

      }
    },
    methods: {
      //保存大屏幕
      saveScreen(){
        //todo 接口
      },
      //预览大屏幕
      previewScreen(){
        // todo 隐藏其他UI
      },
      //向大屏幕添加组件
      addDragItem(option){

        let length = this.drag_items.push(option)
        this.drag_active_index = length-1
      },
      //设置层数
      setZIndex({type}){
        let item = this.drag_items.splice(this.drag_active_index, 1);
        item = item[0]
        if(item == undefined){return }
        let length = this.drag_items.length;

        switch (type) {
          // 顶层
          case 'top': this.drag_active_index = length;break;
          // 上一层
          case 'up': this.drag_active_index = this.drag_active_index + 1 > length ? length:this.drag_active_index + 1;break;
          // 下一层
          case 'down': this.drag_active_index = this.drag_active_index - 1 < 0 ? 0:this.drag_active_index - 1;break;
          // 底层
          case 'bottom':this.drag_active_index = 0;break;
          default: ;break;
        }

        this.drag_items.splice(this.drag_active_index,0,item)
      },
      /*-----------------------mdragble组件-----------------------*/
      //点击容器
      clickItem({active_index}){
        this.drag_active_index = active_index;
      },
      //缩放容器
      resizeDrag({w, h, active_index}){
        this.drag_items[active_index].drag_option.w = w / this.drag_zoom ;
        this.drag_items[active_index].drag_option.h = h / this.drag_zoom;
      },
      //移动容器
      moveDrag({top, left, active_index}){

        this.drag_items[active_index].drag_option.top = top / this.drag_zoom;
        this.drag_items[active_index].drag_option.left = left / this.drag_zoom;
      }

    },
    mounted(){

    },
    filters:{
    },
    computed:{
      com_drag_items(){
        let drag_items =  JSON.parse(JSON.stringify(this.drag_items));
        let z = this.drag_zoom;
        drag_items = drag_items.map((item, index)=>{
          let option = item.drag_option
          option.w *= z;
          option.h *= z;
          option.top *= z;
          option.left *= z;
          option.z = index;
          return item
        })
        return drag_items
      },
      com_drag_box_option(){
        let z = this.drag_zoom;
        // todo 深度克隆
        let option = JSON.parse(JSON.stringify(this.drag_box_option))
        option.w *= z;
        option.h *= z;
        return option
      },
    },
    watch:{

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin";

  .make-screen{
    display: flex;
    &-left, &-center, &-right{
      .title{
        @include size(100%,36px);
        line-height: 36px;
        text-align: center;
      }
    }
    &-left{
      @include size(calc(100% - 410px), 100%);
      overflow: auto;
    }
    &-center{
      @include size(200px, 100%);
      border: 2px solid #aaa;
    }
    &-right{
      @include size(200px, 100%);
    }
  }


</style>

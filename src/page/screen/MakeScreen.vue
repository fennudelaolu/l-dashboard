<template>
  <div class="layout">
    <header class="layout-header">
      <Header @save="saveScreenReady" @preview="previewScreen"  @addDragItem="addDragItem"
              @setZIndex="setZIndex"
              :active_index="drag_active_index">
      </Header>
    </header>
    <section class="layout-section make-screen">

      <div class="make-screen-left">
        <MDragbleBox ref="draw_box" class="dragble-box" :option="com_drag_box_option"  :have_border="false"  @clickItem="clickItem" @resize="resizeDrag" @move="moveDrag">

          <MDragbleItem v-for="(item, i) in com_drag_items" :key="i" :index="i" :active_index="drag_active_index" :option="item.drag_option">

            <textarea v-if="item.type === 'text'" :style="item.style" v-model="item.value">
            </textarea>
            <MCart :w="item.drag_option.w" :h="item.drag_option.h" :option="item.option" v-if="item.type === 'chart'"></MCart>
          </MDragbleItem>

        </MDragbleBox>
      </div>

      <!--画布配置：页面样式-->
      <div v-if="act_drag == null" class="make-screen-center">
        <div class="title">页面样式</div>
        <Collapse >
          <Panel name="1">
            页面尺寸
            <div slot="content">
              <Input type="number"  v-model="drag_box_option.style.width">
                <span slot="prepend">宽度</span>
              </Input>
              <Input type="number" v-model="drag_box_option.style.height">
                <span slot="prepend">高度</span>
              </Input>
            </div>
          </Panel>
          <Panel name="2">
            页面背景
            <div slot="content">
            背景颜色<ColorPicker v-model="drag_box_option.style.background_color" alpha />
            </div>
          </Panel>

        </Collapse>
        缩放（%）
        <Slider v-model="drag_zoom" :min="0.75" :max="1.5" :step="0.01"></Slider>
      </div>
      <!--画布配置：图片样式-->
      <div v-else-if="act_drag.type === 'img'" class="make-screen-center">
        <div class="title">图片样式</div>
        <div class="row">
          <div class="row-title">位置</div>
          <Input type="number" size="small"  v-model="drag_items[drag_active_index].drag_option.left">
            <span slot="prepend">x</span>
          </Input>
          <Input type="number"  size="small" v-model="drag_items[drag_active_index].drag_option.top">
            <span slot="prepend">y</span>
          </Input>

        </div>
        <div class="row">
          <div class="row-title">尺寸</div>
          <Input type="number"  v-model="drag_items[drag_active_index].drag_option.w">
            <span slot="prepend">w</span>
          </Input>
          <Input type="number" v-model="drag_items[drag_active_index].drag_option.h">
            <span slot="prepend">h</span>
          </Input>
        </div>


        <Collapse  accordion>

          <Panel name="1">
            图片文件
            <div slot="content">

            </div>
          </Panel>

        </Collapse>
      </div>
      <!--画布配置：文字样式-->
      <div v-else-if="act_drag.type === 'text'" class="make-screen-center">
        <div class="title">文字样式</div>
        <div class="row">
          <div class="row-title">位置</div>
          <Input type="number" size="small"  v-model="drag_items[drag_active_index].drag_option.left">
            <span slot="prepend">x</span>
          </Input>
          <Input type="number"  size="small" v-model="drag_items[drag_active_index].drag_option.top">
            <span slot="prepend">y</span>
          </Input>

        </div>
        <div class="row">
        <div class="row-title">尺寸</div>
        <Input type="number"  v-model="drag_items[drag_active_index].drag_option.w">
          <span slot="prepend">w</span>
        </Input>
        <Input type="number" v-model="drag_items[drag_active_index].drag_option.h">
          <span slot="prepend">h</span>
        </Input>
      </div>
        <div class="row">
          <div class="row-title g-fl">字体</div>

          <Select v-model="drag_items[drag_active_index].style['font-family']" size="small" style="width:100px">
            <Option  value="SimSun" >宋体</Option>
            <Option  value="SimHei" >黑体</Option>
            <Option  value="Microsoft YaHei" >微软雅黑</Option>
            <Option  value="FangSong" >仿宋</Option>
            <Option  value="KaiTi" >楷体</Option>
          </Select>
        </div>

        <div class="row">
          <div class="row-title">字号</div>

          <Select v-model="drag_items[drag_active_index].style.fontSize" size="small" style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>


        <div class="row">
          <div class="row-title">字体颜色</div>
          <ColorPicker v-model="drag_items[drag_active_index].style.color" />
        </div>
        <div class="row">
          <div class="row-title" >加粗</div>
          <i-switch v-model="drag_items[drag_active_index].style['font-weight']" :true-value="'bold'" :false-value="'normal'"/>
        </div>

      </div>
      <!--画布配置：图表样式-->
      <div v-else-if="act_drag.type === 'chart'" class="make-screen-center">
        <div class="title">图表</div>

        <Tabs value="name1">
          <TabPane label="样式" name="name1">
            <div class="row">
              <div class="row-title">位置</div>
              <Input type="number" size="small"  v-model="drag_items[drag_active_index].drag_option.left">
                <span slot="prepend">x</span>
              </Input>
              <Input type="number"  size="small" v-model="drag_items[drag_active_index].drag_option.top">
                <span slot="prepend">y</span>
              </Input>

            </div>
            <div class="row">
              <div class="row-title">尺寸</div>
              <Input type="number"  v-model="drag_items[drag_active_index].drag_option.w">
                <span slot="prepend">w</span>
              </Input>
              <Input type="number" v-model="drag_items[drag_active_index].drag_option.h">
                <span slot="prepend">h</span>
              </Input>
            </div>
          </TabPane>
          <TabPane label="配置" name="name2"></TabPane>
        </Tabs>
      </div>

      <div class="make-screen-right">
        <div class="title">数据</div>
        <div class="title">
          <Select v-model="table" style="width:200px">
            <OptionGroup v-for="(f_item,i) in table_tree" :key="i" :label="i">
              <Option v-for="(t_item,k) in f_item.child" :value="t_item" :key="k">{{ t_item.name }}</Option>
            </OptionGroup>
          </Select>
        </div>
        <div  class="top">
          维度
          <div v-for="(item, i) in table_head.d" :key="i" class="column-box">
            <M_Icon type="#icon_date" :size="15" color="#4a90e2"></M_Icon>
            {{item}}
          </div>
          <div v-for="(item, i) in table_head.s" :key="i" class="column-box">
            <M_Icon type="#icon_T" :size="15" color="#4a90e2"></M_Icon>
            {{item}}
          </div>

        </div>
        <div  class="buttom">
          值
          <div v-for="(item, i) in table_head.n" :key="i" class="column-box">
            <M_Icon type="#icon_number" :size="15" color="#40c0a8"></M_Icon>
            {{item}}
          </div>
        </div>
      </div>
    </section>

    <Modal
      v-model="save_modal1.show"
      title="保存">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <div slot="footer">
        <Button type="primary" @click="saveScreen" >保存</Button>
      </div>
    </Modal>

  </div>
</template>

<script>

  import {Modal, Tabs, TabPane, Collapse, Panel, Input, ColorPicker, Slider } from 'iview';

  import Header from './Header'
  import MCart from '../../components/M_Chart'
  import MDragbleBox from '../../components/mdragble/DragBox'
  import MDragbleItem from '../../components/mdragble/DragItem'
  //拖拽组件
  import draggable from 'vuedraggable'

  import html2canvas from 'html2canvas'

  import {DATA_MANAGER_API, SCREEN_API} from '../../server/api'

  export default {
    name: "MakeScreen",
    components: {Header, MCart, MDragbleBox, MDragbleItem , draggable,
      Modal,Tabs,TabPane, Collapse, Panel, Input, ColorPicker, Slider},
    props:{

      target_forder_name:{
        type:String,
        default:'未分类'
      },
    },
    data(){
      return {
        //页面配置
        split:0.5,

        table_tree:[],//数据表与表结构
        table:{},

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

        save_loading:false,
        save_modal1:{
          show: false,
          screen_name: '',
          target_forder_name: '',
          note:''
        },

        /*--------mdragble容器------*/
        drag_zoom:1,      //缩放
        drag_box_option:{
          have_border:true,
          style: {
            width:500,
            height:800,
            background_color:'',
            background:"",
          }
        },//容器外壳配置
        drag_items:[],    //容器列表
        drag_active_index:'',//当前活动容器

      }
    },
    methods: {
      async init(){

        //获取左侧目录
        let r = await DATA_MANAGER_API.findTree();
        if(r.data.code == 200){
          this.table_tree = r.data.data || null
          console.log( this.table_tree)
        } else {
          this.aside_tree = null
        }

      },

      //保存大屏幕
      saveScreenReady(){
        this.save_modal1.show = true;
        this.save_modal1.target_forder_name = this.target_forder_name;
      },
      async saveScreen(){
        let img = await this.toBase64();
        let folder_name = this.target_forder_name;
        let screen_name = this.save_modal1.screen_name;
        let note = this.save_modal1.note;
        let option = {
          drag_box_option:this.drag_box_option,
          drag_items:this.drag_items,
        }

        let r = await SCREEN_API.createScreen({ folder_name, screen_name, option, img, note})

      },
      //截取画布图片
      async toBase64() {
        // 创建一个新的canvas
        const _canvas = this.$refs['draw_box'].$el ;
        // 此处用于解决截图不清晰问题，将生成的canvas放大，然后再填充到原有的容器中就会清晰
        const width = _canvas.offsetWidth;
        const height = _canvas.offsetHeight;
        const canvas2 = document.createElement('canvas');
        const scale = 2;
        canvas2.width = width * scale;
        canvas2.height = height * scale;
        const context1 = canvas2.getContext('2d')
        if(context1) {
          context1.scale(scale, scale);
        }
        const opts = {
          scale,
          canvas: canvas2,
          // logging: true, //日志开关，便于查看html2canvas的内部执行流程
          width,
          height,
          // 【重要】开启跨域配置
          useCORS: true

        }

        let imgUrl = await html2canvas(_canvas,opts).then((canvas) => {
          const context = canvas2.getContext('2d');
          if(context) {
            context.scale(2,2);
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;
          }
          // canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
          let imgUrl = canvas.toDataURL();
          return  imgUrl
        });
        return imgUrl;
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
        let zoom = this.drag_zoom / 100;
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
      this.init()
    },
    filters:{
    },
    computed:{
      //画布比例缩放结果
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
        option.style.width *= z;
        option.style.height *= z;
        return option
      },

      //当前操作的元素
      act_drag(){
        let index = this.drag_active_index || ''

        if(index == '' && this.drag_items.length > 0) {
          return null
        } else {
          return this.drag_items[index]
        }

      },

      //当前选择数据表结构
      table_head(){
        let head = this.table.head || '{}'
        head = JSON.parse(head)
        let r = {s:[], d:[], n:[],}
        for(let i in head){
          let type = head[i].type || 's'
          r[type].push(i)
        }
        return r
      }
    },
    watch:{

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin";

  .make-screen{


    &-left, &-center, &-right{
      border-left: 1px solid #aaa;
      .title{
        @include size(100%,36px);
        line-height: 36px;
        text-align: center;
        border-bottom: 1px solid #ddd;
      }
      .row{
        @include size(100%,auto);
        display: flex;
        padding: 4px 5px;
        text-align: center;
        border-bottom: 1px solid #ddd;

        &-title{
          width: 76px;
          height:30px;
          text-align: left;
          line-height: 30px;
        }
      }
    }
    &-left{
      @include size(calc(100% - 410px), 100%);
      overflow: auto;
      .dragble-box{
        margin: 20px auto;
      }
    }
    &-center{
      @include size(200px, 100%);

    }
    &-right{
      @include size(200px, 100%);

      .top{
        @include size(100%, calc(50% - 36px));
        overflow-y: auto;
        border-bottom: 1px solid #aaa;
      }
      .buttom{
        @include size(100% , calc(50% - 36px));
        overflow-y: auto;
      }

      .column-box{
        @include size(100%, auto);
        padding: 0px 10px;


      }
    }
  }


</style>
<style lang="scss">

  .make-screen {
    display: flex;

    .make-screen-center .row .ivu-input-group-prepend {
        padding: 0px 3px;
    }

    .ivu-tabs-bar {
      border-bottom: 1px solid #dcdee2;
      margin-bottom: 0px;
    }
    .ivu-tabs-nav {
      margin: 0 25px;
    }
  }
</style>

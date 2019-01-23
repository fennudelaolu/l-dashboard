<template>
  <div class="screnn-list">
    <aside class="screnn-list-aside">
      <M_Aside1 :list="aside_tree"
           @create="createF" @delete="del_ready" @openFile="openFile" @refreshTree="init"></M_Aside1>
    </aside>
    <section class="screnn-list-section" style="padding:0;">
      <div v-if="act_screen!=null" class="screen-list-right-top" >
        <span class="title" >{{act_screen.name}}</span>
        <div  class="btn-group g-fr">
          <Button  disabled>全屏</Button>
          <Button  disabled>刷新数据</Button>
          <Button  disabled>编辑</Button>
          <Button type="error" >删除</Button>
        </div>
      </div>
      <div class="screen-list-right-section">
        <ShowScreen v-if="screen_option!=null"
                    :drag_items="screen_option.drag_items"
                    :drag_box_option="screen_option.drag_box_option"
                    ></ShowScreen>
        <!--<img v-if="act_screen!=null" style="width: 100%;height: 100%;" :src="act_screen.img" alt="a" ></img>-->
      </div>
    </section>

    <!--删除文件/文件夹对话框-->
    <Modal v-model="del_form.show" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>Delete confirmation</span>
      </p>
      <div style="text-align:center">
        <p v-if="del_form.type === 'folder'">删除文件夹“ {{del_form.folder_name}} ”及文件夹下的表格。</p>
        <p v-else="del_form.type === 'folder'">删除“ {{del_form.file_name}} ”表格。</p>
        <p>是否继续?</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="del_form.loading" @click="deleteF">确认删除</Button>
      </div>
    </Modal>

    <!--创建文件夹-->
    <Modal
      v-model="create_folder_form.show"
      title="请输入分类名称"
      @on-cancel="openCreateFolderForm">
      <Input v-model="create_folder_form.name" placeholder="Enter something..."  />
      <div slot="footer">
        <Button  size="large" type="info" :loading="create_loading" @click="createFolder">创建</Button>
      </div>
    </Modal>

  </div>

</template>

<script>
  import {Modal, Input, Icon, Button} from 'iview'

  import M_Aside1 from '../../components/M_Aside1'
  import ShowScreen from './ShowScreen'
  import {SCREEN_API} from '../../server/api'

  export default {
    name: "ScreentList",
    components:{M_Aside1,ShowScreen, Modal, Input, Icon, Button},
    data(){
      return {
        folder_name:'文件夹1',

        aside_tree:null,
        //删除对话框
        del_form:{
          show:false,
          folder_name:'',
          file_name: '',
          type:'',
          loading:false,
        },
        //新建文件夹对话框
        create_loading:false,
        create_folder_form:{
          show:false,
          name:'',
        },
        //当前活动大屏幕
        act_screen:null

      }
    },
    mounted(){
      this.init();
    },
    methods: {
      goMakeScreenPage(folder_name){

        this.$router.push({ name: '大屏幕制作' , params: { target_forder_name:folder_name }})
      },

      async init(){
        //刷新左侧目录
        let r = await SCREEN_API.findTree();
        if(r.data.code == 200){
          this.aside_tree = r.data.data || null
        } else {
          this.aside_tree = null
        }
        //初始化页面变量
        this.create_folder_form = {
          show:false,
          loading: false,
          name:'',
        }

      },
      /*------aside菜单组件-----*/
      createF({type,folder}){
        if(type === 'folder'){
          this.openCreateFolderForm()
        } else {
          let folder_name = folder.name || '未分类'
          this.goMakeScreenPage(folder_name)
        }
      },
      del_ready(f){
        this.del_form = {
          show:true,
          folder_name:f.folder_name,
          file_name:f.file_name,
          type:f.type,
          loading:false,
        }
      },
      async deleteF(){

        let r = null;
        let type = this.del_form.type;
        this.del_form.loading = true;
        if(type === 'folder'){
          r = await SCREEN_API.delFolder({folder_name: this.del_form.folder_name})
        }else{
          r = await SCREEN_API.delScreen({folder_name: this.del_form.folder_name, table_names: [this.del_form.file_name]})
        }
        this.del_form.loading = false;
        if(r.data.code == 200){
          this.del_form.show = false
          this.init()
        } else {
          this.$Message.error('删除失败');
        }

      },
      async openFile(f){
        this.act_screen = f.data || null;
      },

      //打开/关闭创建文件夹对话框
      openCreateFolderForm(){
        this.create_folder_form = {
          show:!this.create_folder_form.show,
          name:'',
        }
      },
      //创建文件夹
      async createFolder(){
        this.create_loading = true
        let forder_name = this.create_folder_form.name || '未分类'
        let r = await SCREEN_API.createFolder(forder_name)
        if(r.data.code == 200){
          this.$Message.success('创建成功');
          this.init();
        } else {
          this.$Message.error('创建失败');
        }
        this.create_loading = false

      },

    },
    computed:{
      screen_option(){
        if(this.act_screen==null){
          return null
        } else {
          let option = this.act_screen.screen_option || '{}'
          option = JSON.parse(option)
          return option
        }
      },

    },
    watch:{

    }
  }

</script>

<style lang="scss" >

  @import '../../style/mixin';

  //页面布局
  .screnn-list{
    display: flex;
    flex-direction: row;
    @include size(100%, 99%);

    $_aside_width: 280px;
    .screnn-list-aside {
      @include size($_aside_width, 100%);
      border-right: 2px solid $color_gray0;
    }
    .screnn-list-section {
      @include size(calc(100% - #{$_aside_width} ), 100%);
      padding: 5px 20px;
    }

  }

  .screen-list-right{
    $_top_height:54px;
    &-top{
      position: relative;
      width: 100%;
      height: 54px;
      padding:10px 20px;
      line-height:calc(#{$_top_height} - 20px);
      border-bottom: 1px solid #aaa;
      .title{
        display: inline-block;
      }
      .btn-group{
        display:flex;
        justify-content:flex-end;
        width: auto;
        height: 100%;
      }
    }
    &-section{
      width: 100%;
      height:calc(100% - #{$_top_height});
      padding: 10px 10px;
    }
  }






</style>

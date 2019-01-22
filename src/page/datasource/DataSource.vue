<template>
  <div class="data-source">
    <aside class="data-source-aside">
      <M_Aside1 :list="aside_tree"
                @create="createF" @delete="del_ready" @openFile="openFile" @refreshTree="init"></M_Aside1>
    </aside>
    <section class="data-source-section">
      <excel-uploader v-if="view === view_type.upload" :folder_tree="aside_tree" :target_folder="target_folder" @endUpdata="endUpdata"></excel-uploader>
      <TableView  v-else-if="view === view_type.read_table" :table_data="table_data"></TableView>
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
      title="请输入文件夹名称"
      @on-cancel="openCreateFolderForm">
      <Input v-model="create_folder_form.name" placeholder="Enter something..."  />
      <div slot="footer">
        <Button  size="large" type="info" :loading="create_loading" @click="createFolder">创建</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
    import M_Aside1 from '../../components/M_Aside1'
    import excelUploader from './excelUploader'
    import TableView from './TableView'
    import {DATA_MANAGER_API} from '../../server/api'

    export default {
      name: "DataSource",
      components:{M_Aside1, excelUploader, TableView},
      data(){
        return {
          //视图控制
          view:'',
          view_type:{
            main:'0',
            upload:'1',
            read_table:'2',
          },

          aside_tree:null,
          //某个表的数据
          table_data:[],
          //上传文件目标文件夹（为空不显示）
          target_folder: null,
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
        }
      },
      mounted(){
        this.init();

      },
      methods:{
        async init(){

          //刷新左侧目录
          let r = await DATA_MANAGER_API.findTree();
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
          this.view = 0;
          this.table_data = []

        },
        setViewType(type){
          this.view = type;
        },
        /*------aside菜单组件-----*/
        createF({type,folder}){
          if(type === 'folder'){
            this.openCreateFolderForm()
          } else {
            this.target_folder = folder || '未分组';
            this.setViewType(this.view_type.upload);
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
          if(type === 'file'){
            r = await DATA_MANAGER_API.delTable({folder_name: this.del_form.folder_name, table_names: [this.del_form.file_name]})
          }else{
            r = await DATA_MANAGER_API.delFolder({folder_name: this.del_form.folder_name})
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
          let real_name = f.data.real_name;
          let r = await DATA_MANAGER_API.getTableByPage({real_name,start: 0,end: 1000});
          if(r.data.code == 200 ){
            this.table_data = r.data.data;
            this.setViewType(this.view_type.read_table);
          } else {
            this.$Message.error('获取表数据失败')
          }
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
          let forder_name = this.create_folder_form.name || '未分组'
          let r = await DATA_MANAGER_API.createFolder(forder_name)
          if(r.data.code == 200){
            this.$Message.success('创建成功');
            this.init();
          } else {
            this.$Message.error('创建失败');
          }
          this.create_loading = false

        },

        /*------上传组件-----*/
        endUpdata(data){
          this.init();
        },

        // todo 多线程上传
        get(){
          let worker = new Worker('/static/up_plugin/main.js');
          worker.postMessage({a:this});
          let r = 0;
          worker.onmessage = function (event) {
            r++
            if(r>5){worker.terminate();} //杀死进程
            else{console.log(r)}
            console.log('接受信息'+event.data)
          }

        }

      },
      computed:{
      },
      watch:{

      }
    }
</script>

<style lang="scss" >

  @import '../../style/mixin';

  .data-source{
    display: flex;
    flex-direction: row;
    @include size(100%, 100%);

  }

  $aside_width: 280px;
  .data-source-aside {
    @include size($aside_width, 100%);
    border-right: 2px solid $color_gray0;
  }
  .data-source-section {
    @include size(calc(100% - #{$aside_width} ), 100%);
    padding: 5px 20px;
  }


</style>

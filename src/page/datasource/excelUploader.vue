<template>
  <!--读取文件-->
  <div class="excel-uploader">

    <header class="excel-uploader-header">
      <Steps :current="current">
        <Step title="已完成" content="上传文件"></Step>
        <Step title="进行中" content="设置字段"></Step>
        <Step title="待进行" content="完成"></Step>
      </Steps>
    </header>

    <section class="excel-uploader-section">
      <!--第一步：上传-->

      <uploader v-if="current == 0 " :options="options" @file-added="initFile" :autoStart="false" class="uploader-example">

        <uploader-unsupport></uploader-unsupport>
        <uploader-drop style="text-align: center">
          <uploader-btn :attrs="attrs" :single="true" >点击上传文件1</uploader-btn>或拖拽上传
          <div v-show="!isReading" style="text-align: center">支持Excel文件（单个Excel最大100M，CSV最大200M）</div>
          <div style="text-align: center">{{isReading?'读取中...':'默认识别第一个sheet文件'}}</div>
        </uploader-drop>
        <uploader-list></uploader-list>
      </uploader>
      <!--第二步：设置数据类型-->

      <Tabs v-else-if="current == 1 " type="card" style="width: 100%;height: 100%;" >

        <TabPane  v-for="(sheet, s_i) in xlsx_info" :key="s_i" :label="s_i"  style="width: 100%;height: 100%;" >

          <TableView :table_data="sheet" :head_bar="true"  :max_row="1000" :table_info="s_i"
            @chooseHeadType="chooseHeadType"></TableView>

          </TabPane>
      </Tabs>

      <div v-else-if="current == 2 " style="display:flex;width: 80%;height: 100%;border: 1px solid;margin: 0 auto;" >
        <div style="width: 45%;height:100%;border-right: 3px solid; padding: 1px">
          <header style="padding: 15px;font-size:12px;text-align: left;">工作表</header>
          <div v-for="(form, i) in up_form" :key="i" @click="changeForm(i)"
               style="height:32px;cursor: pointer;text-align: left;
              padding: 4px 15px;" :style="i === act_form_index ? 'background: #f2f2f2;':''">
            <M_Icon class="g-fl" type="#icon_excel" :size="20" :color="'#0F9D58'"  ></M_Icon>
            <div style=""class="g-fl">{{form.table_name}}</div>

          </div>

        </div>
        <div v-show="act_form_index == i" v-for="(form, i) in up_form" :key="i" style="width: 55%;height:100%;padding: 10% 30px;" >
          <Form :model="form" :label-width="80">
            <FormItem label="表名">
              <Input v-model="form.table_name" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="位置">
              <Select v-model="form.folder_name">
                  <Option v-for="(item, i) in folder_tree" :key="i" :value="i">/{{i}}</Option>
              </Select>
            </FormItem>


            <FormItem label="备注">
              <Input v-model="form.note" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
          </Form>
        </div>
      </div>
    </section>

    <footer class="excel-uploader-footer">
      <Button  type="default" v-if="current == 1" @click="lastStep()">重新上传</Button>
      <Button  type="default" v-else-if="current == 2" @click="lastStep()">上一步</Button>
      <div style="width: 100px;height: 20px;display: inline-block"></div>
      <Button  type="info" v-if="current == 1" @click="current=2">下一步</Button>
      <Button  type="info" v-if="current == 2" @click="createTableAndReadyUpload()">上传</Button>

    </footer>

    <Modal
      v-model="up_current_modal.show" :closable="false" :mask-closable="false"
      :title="up_status==='end'? '上传进度':'上传中...'">

      <div v-for="(item, i ) in up_current_modal.up_mesage" :key="i" style="padding: 4px 0px">
        <span>

        <i-circle :percent="Math.ceil((item.send_count / item.count)*100)" :size="16" :stroke-width="24" :stroke-color="up_table_status_color[item.status]">

        </i-circle>
        </span>
        <span>/ {{item.folder_name}}</span>
        <span>/ {{item.table_name}}</span>

      </div>

      <div slot="footer">
        <Button @click="closeUp">{{up_status==='end'? '关闭':'取消'}}</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
  // import uploader from 'vue-simple-uploader'
  import { Steps, Step} from 'iview'

  import XLSX from 'xlsx'
  import TableView from './TableView'
  import {DATA_MANAGER_API} from '../../server/api'
  import {baseUrl} from '../../config/env'


  export default {
    components:{  TableView, Step, Steps},
    props:{
      folder_tree:{
        type:Object,
        default:{
          "fff":{
            "child":[{"id":50,"name":"11.xlsx_Sheet1","pname":"fff","real_name":"a_ab55eeba2fda48fab3923223db2ee6f","type":"table","user":"a"}],"name":"fff"
          },
          'f':{child:[],name:'f'}
        }
      },
      target_folder:{
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        current:0,

        //设置表位置、名称等
        up_form:[
          {}
        ],
        //控制form选项卡
        act_form_index:0,
        //当前所有上传线程（一个表一个）
        up_workers:[],
        //上传进度对话框
        up_current_modal:{
          show:false,
          up_mesage:[],
        },
        //上传状态
        up_status:'',
        //每个表上传状态对应的进度条颜色
        up_table_status_color:{
          uploading:'#43A3FB',
          success:'#5cb85c',
          error: '#ff5500'
        },


        //读取文件配置
        XLS_TYPE: 'application/vnd.ms-excel',
        XLSX_TYPE:  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        FILE_SIZE: 1024 * 1024 * 1024,

        //XLSX解析配置
        file_name:'',
        xlsx_info:{},
        DATA_TYPE: ['s','n','d'],

        isReading:false,
        readTimer:'',

        //上传文件配置
        options: {
          singleFile: true,
          simultaneousUploads: 1,
          target: '//localhost:3000/upload',
          testChunks: false,
        },
        attrs: {
          accept: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-excel']
        },

      }
    },
    mounted(){

    },
    methods:{

      init(){
        this.xlsx_info = {}
        this.act_form_index = 0;
      },
      //上一步操作
      lastStep(){
        if(this.current == 1){
          this.init();
        }
        this.current -= this.current==0 ? 0:1;

      },

      //点击tab标签切换form表单
      changeForm(index){
        this.act_form_index = index;
      },
      //创建表并准备上传已读取文件数据
      async createTableAndReadyUpload(){

        let data = this.xlsx_info
        let upworker_json_data = []
        //创建表并准备上传数据
        for(let sheet_key in data){
          let head = data[sheet_key].head
          let columns = {}
          for(let i in head){
            columns[i] = head[i].type || ''
          }

          let r = await  DATA_MANAGER_API.createTable({
            folder_name: this.up_form[sheet_key].folder_name || '未分组',
            table_name: this.up_form[sheet_key].table_name,
            note: this.up_form[sheet_key].note,
            head:JSON.stringify(head),
            columns: columns
          })
          if(r.data.code == 200) {

            let up_data = data[sheet_key].data

            upworker_json_data.push({
              folder_name: this.up_form[sheet_key].folder_name || '未分组',
              table_name: this.up_form[sheet_key].table_name,
              up_data,
            })
          }
        }

        this.uploadData(upworker_json_data)

      },
      //上传数据
      uploadData(upworker_json_data){

        let _this = this;
        this.up_current_modal.show = true;
        let  worker = new Worker('/static/up_plugin/main.js');
        worker.postMessage({
          method:'readyUpload',
          args:{
            url:baseUrl+DATA_MANAGER_API.inputData_url,
            method:'POST',
            token:_this.user_token,
            json_data:upworker_json_data
          }});
        worker.onmessage = function (event) {
          let data = event.data;
          let status = data.status;
          _this.up_status =status
          switch (status) {
            case 'working': break;
            case 'end': worker.terminate();break;
          }
          _this.up_current_modal.up_mesage = data.message || [];
        }
        this.up_workers.push(worker)
      },
      //结束上传
      closeUp(){
        for(let i in this.up_workers){
          this.up_workers[i].terminate();
        }
        this.up_workers = [];
        this.up_current_modal={
          show:false,
          up_mesage:[]
        }
        this.$emit('endUpdata',{});
      },

      /*--------------------For vue-simple-uploader-----------------*/
      //选择文件
      initFile(file){
        this.isReading = true;
        let is_can_up = this.isCanUploader (file);
        this.file_name = file.name;

        if ( !is_can_up ) {
          file.ignored = true;
          return false;
        } else {
          return true;
        }
      },
      isCanUploader (file) {
        file = file || {};

        if( file.isFolder ) {//判断是否是文件
          return false;
        } else if( file.fileType !== this.XLS_TYPE && file.fileType !== this.XLSX_TYPE  ) { // 合法类型
          return ;
        } else if(file.size > this.FILE_SIZE ) { //合法大小
          return ;
        }


        this.readExcel(file.file);

      },
      //todo 需要多线程支持
      readExcel(file) {//表格导入
        let _this = this;


        const fileReader = new FileReader();
        fileReader.onload = (ev) => {

          try {
          //读表
            const data = ev.target.result;
            //cellDates: true, 时间格式
            //todo 日期转成浮点型
            const workbook = XLSX.read(data, {
              type: 'binary',dateNF:'mm/dd/yyyy', cellDates: true, raw:false
            });



            //格式化数据
            _this.xlsx_info = {}  //初始化表信息
            for(let sheet_k in workbook.Sheets) { //遍历Sheets

              let sheets =XLSX.utils.sheet_to_json(
                workbook.Sheets[sheet_k],
                {defval:''}
                ) ;

              if(sheets.length == 0) {continue;}

              let heads = Object.keys(sheets[0]);
              let head = {};
              for (let i in heads){
                head[heads[i]] = {type: 's'};
              }

              //创建sheet[n] 信息；
              _this.xlsx_info[sheet_k] = {
                head: head,
                filtter: [],
                old_data: sheets,
                data: JSON.parse(JSON.stringify(sheets))
              };

            }
            _this.current = 1;
          } catch (e) {
            console.log('读取文件错误：'+e)
            return false;
          }
          _this.isReading = false;

        };
        fileReader.readAsBinaryString(file);

      },
      /*---------------------For TableView----------------------------*/
      //修改字段类型
      chooseHeadType({table_info,head_name,type}){
        let _xlsx_info = this.xlsx_info;
        this.xlsx_info = {};
        let h = _xlsx_info[table_info].head
        h[head_name] = {type};
        this.xlsx_info =_xlsx_info
      },

    },
    computed:{
      //获取token权限，用于webworker 上传
      user_token(){
        let user = this.$store.getters[this.$store_type.USER] || {}
        return user.token || ''
      },

    },
    watch:{
      xlsx_info: {
        handler(newval, oldval) {


          let _xlsx_info = this.xlsx_info;

          this.up_form = {}

          //遍历 根据字段类型格式化
          for(let sheet_k in _xlsx_info) {

            let sheet = _xlsx_info[sheet_k];
            let old_data = sheet.old_data;
            let data = JSON.parse(JSON.stringify(old_data));
            let head = sheet.head;

            for(let i in data){
              let row = data[i];
              for(let j in head){

                let cell = row[j];

                //todo 浮点型转成日期
                /*if(typeof cell === 'object'){
                  cell = cell.Format('yyyy-MM-dd hh:mm:ss.S');
                }*/

                let data_type = head[j].type;
                let v = '';

                let a = parseFloat(cell)
                switch (data_type) {
                  case 'n':
                    v = parseFloat(cell) || 0;break;
                  case 'd':
                    v = cell;break;
                  case 's': ;
                  default:

                    v = cell.toString();
                }

                this.xlsx_info[sheet_k]['data'][i][j] = v;
              }
            }

            this.up_form[sheet_k] = {
              table_name: this.file_name + ' - '+ sheet_k,
              folder_name: this.target_folder.name || '未分组',
              note:''
            }

          }

          /*
           *  filter 过滤信息
           * */
          if(JSON.stringify(_xlsx_info) === '{}'){return null}

        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" >
  @import "../../style/mixin";
//todo 将style 写成class
  $_header-h: 48px;
  $_footer-h: 40px;
  $_section-h: calc(100% - #{ $_header-h + $_footer-h });
  .excel-uploader {

    @include size(100%, 100%);

    text-align: center;
    
    &-header {
      @include size(100%, $_header-h);

    }
    &-section {
      @include size(100%, $_section-h);

      .ivu-tabs .ivu-tabs-content-animated {
        @include size(100%, calc(100% - #{48px}));

      }

    }
    &-footer{
      @include size(100%, $_footer-h);
      padding-top: 10px;
    }


    /*上传文件组件*/
    .uploader-example {
      width: 100%;
      padding: 15px;
      box-shadow: 0 0 10px rgba(0, 0, 0, .4);
    }
    /*覆盖样式*/
    .uploader-btn {
      color: blue !important;
      border: 0  !important;
    }

  }


</style>

<!--
选择一个文件
验证：
  大小
   类型
   读取首行
配置字段类型
上传

-->
<template>
  <div>

    <uploader :options="options" @file-added="initFile" :autoStart="false" class="uploader-example">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>Drop files here to upload or!!!!!!</p>
      <uploader-btn :attrs="attrs" :single="true" >select files</uploader-btn>

    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>

    <div>{{xls_view_data}}</div>


  </div>

</template>

<script>
  import XLSX from 'xlsx'


  export default {
    data () {
      return {
        XLS_TYPE: 'application/vnd.ms-excel',
        XLSX_TYPE:  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        FILE_SIZE: 1024 * 1024,

        //XLSX解析配置

        xlsx_info:{},
        DATA_TYPE: ['s','n','d'],

        //上传文件配置
        options: {
          singleFile: true,
          simultaneousUploads: 1,
          target: '//localhost:3000/upload',
          testChunks: false,
        },
        attrs: {
          accept: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-excel']
        }
      }
    },
    mounted(){

    },
    methods:{
      /*--------------------For vue-simple-uploader-----------------*/
      //选择文件时
      initFile(file){
        console.log(file);
        let is_can_up = this.isCanUploader (file);
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
      readExcel(file) {//表格导入
        let _this = this;

        const fileReader = new FileReader();
        fileReader.onload = (ev) => {
          console.log(ev)
          /*try {*/

          //读表
            const data = ev.target.result;
            const workbook = XLSX.read(data, {
              type: 'binary',dateNF:'mm/dd/yyyy', cellDates: true
            });

            //格式化数据 sheet_to_json override

            _this.xlsx_info = {}  //初始化表信息
            for(let sheet_k in workbook.Sheets) { //遍历Sheets

              //创建sheet[n] 信息；
              _this.xlsx_info[sheet_k] = {
                head: {},
                filtter: [],
                data: [],
              };

              //创建副本共下面使用
              let sheet_info = _this.xlsx_info[sheet_k];
              let sheet = workbook.Sheets[sheet_k];

              //用于记录接下来遍历单元格所在的列名1
              let head = '';

              for (let cell_k in sheet) { //遍历每个单元格
                if (!/^[A-Z]*[0-9]*$/.test(cell_k)) {
                  continue;//此单元格位置非法（合法例子：A1）
                }

                //获取行号，例：把A2 处理成2
                let cell_i = parseInt(cell_k.substring(cell_k.search(/[0-9]/i),cell_k.length)) || -1

                if (cell_i == 1) { //表头
                  let k = sheet[cell_k].w;
                  sheet_info.head[k] = {type: ''};
                  head = k;
                } else if (cell_i > 1) {//不是表头
                  let cell = sheet[cell_k];

                  sheet_info.data.push({
                    h: head,
                    t: cell.t || 's',
                    v: cell.v || 0,
                    w: cell.w || '',
                    d: cell.d || 0
                  });
                } else {
                  continue;
                }
              }

              //如果sheet下无内容，过滤掉
              if(sheet_info.data.length==0){
                delete _this.xlsx_info[sheet_k];
              }
            }


          /*} catch (e) {
            console.log('erro')
            return false;
          }*/
        };
        fileReader.readAsBinaryString(file);
      },
    },
    computed:{
      xls_view_data(){

        let r = {};

        for(let sheet_k in this.xlsx_info) {

          let sheet = this.xlsx_info[sheet_k];
          let data = sheet.data;
          let head = sheet.head;

          r[sheet_k] = {head: sheet.head, data: []};

          for(let i in data){
            let cell = data[i];
            let data_type = head[cell.h].type;
            let v = '';
            switch (data_type) {
              case 'n':
                v = cell.v;break;
              case 'd':
                v = cell.d;break;
              case 's': ;
              default:
                v = cell.w;break;
            }
            r[sheet_k].data.push({h: cell.h, v});
          }

        }

        return r;
      }
    }
  }
</script>

<style lang="scss" >
  .uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>

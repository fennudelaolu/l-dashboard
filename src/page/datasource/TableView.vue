<template>
  <!--todo 筛选-->
    <div class="data-source-tableview">
      <div>共{{table_data.data.length}}条数据，当前显示{{table_body_data.length}}条</div>
      <div :ref="'table-head-box'" class="table-head">
        <table :ref="'table-head'">
          <thead>
          <tr>
            <th>
              <div style="width: 15px;" >#</div>
            </th>
            <th  v-for="(head, h_i) in c_table_data.head">
              <div :ref="'thead'" class="cell">
                <div v-show="head_bar" style="width: 34px;height: 20px;">
                  <Dropdown>
                    <a href="javascript:void(0)">
                      {{head.type || 's'}}
                      <Icon type="ios-arrow-down"></Icon>
                    </a>

                    <DropdownMenu slot="list">

                      <div @click="chooseHeadType(h_i,'s')">
                        <DropdownItem>字符串</DropdownItem>
                      </div>
                      <div @click="chooseHeadType(h_i,'d')">
                        <DropdownItem>日期</DropdownItem>
                      </div>
                      <div @click="chooseHeadType(h_i,'n')">
                        <DropdownItem>数字</DropdownItem>
                      </div>

                    </DropdownMenu>
                  </Dropdown>
                </div>

                {{h_i }}
              </div>

            </th>
          </tr>
          </thead>
        </table>
      </div>
      <div :ref="'table-body-box'"  class="table-body" border="1">
        <table :ref="'table-body'" >
          <tbody >
          <tr   v-for="(row, r_i) in table_body_data" :key="r_i">
            <td><div style="width: 15px;" >{{r_i+1}}</div></td>
            <td  v-for="(head, h_j) in table_data.head" :key="h_j"  >
              <div :ref="'tbody' + r_i" class="cell">{{row[h_j]}}</div>
            </td>

          </tr>
          </tbody>
        </table>

      </div>
    </div>
</template>

<script>
  import { Icon} from 'iview'
    export default {
      name: "TableView",
      components:{ Icon},
      props:{
        //是否含有头部类型选择按钮
        head_bar:{
          type:Boolean,
          default: false
        },
        //显示数据
        table_data:{
            type: Object,
            default:{
              head:{col1:{type:'s'},col2:{type: 'd'}},
              data:[
                {col1: '1', clo2: 4}
                ]

            },
          },
        //最大显示行数
        max_row:{
          type:Number,
          default:500
        },
        //自定义表信息,此组件任何事件都返回该数据，类型不限
        table_info:''
      },
      data(){
        return {
          data:{}
        }
      },

      methods: {
        //比较list1，list2两个dom的宽，分别以最宽为主
        compareWidth(list1, list2){
          for(let i in list1){
            let width = 0
            //取最宽的值
            width = list1[i].offsetWidth > list2[i].offsetWidth ? list1[i].offsetWidth : list2[i].offsetWidth;
            //消除小数误差 同时赋值
            list2[i].style.width = width + 'px';
            list1[i].style.width = width + 'px';
          }
        },
        //格式化表格宽度
        formatTableWeidth(){
          //先比较单元格
          let ths = this.$refs['thead']
          let tds = this.$refs['tbody0']
          this.compareWidth(ths, tds)

          //比较外壳与table的宽，防止表格x轴隐藏掉
          let table_head_box = this.$refs['table-head-box']
          let table_head = this.$refs['table-head']
          this.compareWidth([table_head_box], [table_head])

          let table_body_box = this.$refs['table-body-box']
          let table_body = this.$refs['table-body'];
          this.compareWidth([table_body_box], [table_body])
        },
        //选择头类型
        chooseHeadType(head_name,type){
          this.$emit('chooseHeadType',{table_info:this.table_info, head_name, type})
        }
      },

      computed:{
        c_table_data(){
          this.data = this.table_data;
          return this.data
        },
        table_body_data(){
          return this.table_data.data.slice(0,this.max_row)
          return this.table_data.data.slice(0,this.max_row)

        }

      },
      watch:{
        //监听触发调整表格宽
        data(val, oldVal) {
          this.formatTableWeidth()
        },
        /*table_data(val, oldVal) {
          this.get()
        },*/
      }
    }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  .data-source-tableview{
    @include size(100%, 100%);

      overflow-x: auto;
      overflow-y: hidden;

      .table-head{
        /*padding-right:17px;*/
        margin: 0 auto;
        background-color:#999;
        color:#000;
        font-weight: bolder;
      }
      .table-body{
        margin: 0 auto;
        height:calc(100% - 32px);
        overflow-y:auto;
        overflow-x: hidden;
      }


    //斑马线
    .table-body table tr:nth-child(2n+1){background-color:#f2f2f2;}

    //单元格缩进
    .cell {
      display: flex;
      flex: auto;
      padding: 3px 20px;
    }
  }
</style>

<template>
  <!--todo 筛选-->
    <div class="data-source-tableview">

      <div :ref="'table-head-box'" class="table-head">
        <table :ref="'table-head'">
          <thead>
          <tr>
            <th>
              <div :ref="'thead'" style="width: 50px;" class="cell">#</div>
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
                      <DropdownItem>字符串</DropdownItem>
                      <DropdownItem>日期</DropdownItem>
                      <DropdownItem>数字</DropdownItem>

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
            <td><div :ref="'tbody' + r_i" style="width: 50px;" class="cell">{{r_i+1}}</div></td>
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
    export default {
      name: "TableView",
      props:{
        head_bar:{
          type:Boolean,
          default: false
        },
          table_data:{
            type: Object,
            default:{
              head:{col1:{type:'s'},col2:{type: 'd'}},
              data:[
                {col1: '1', clo2: 4}
                ]

            },
          },
        max_row:{
          type:Number,
          default:500
        }
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

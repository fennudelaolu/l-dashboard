<template>
  <div class="m-aside1">
    <!--功能名称-->
    <div class="m-aside1-title">
      <div class="g-fl f-b f-12">数据表</div>
      <M_Icon :size="24" type="#btn_add" :isbtn="true" color="#aaa" class="g-fr" @click="createFolder()"></M_Icon>
    </div>
    <!--查找-->
    <div class="m-aside1-seach">
      <input type="text" v-model="search_key" class="m-aside1-seach-item">
    </div>
    <!--列表-->
    <div class="m-aside1-list">
      <div v-for="(item, k) in search_reasul" :key="k"class="m-aside1-list-item" >

        <div  class="m-aside1-folder">
          <M_Icon :type="open_states[k] | folder_icon" :size="24" class="m-aside1-list-item-icon" ></M_Icon>
          <a @click="openFolder(k)" class="m-aside1-list-item-title no-select" >
            {{item.name}}
          </a>

          <Dropdown trigger="click" >
            <a href="javascript:void(0)" >
              <M_Icon :size="24" type="#btn_more1" color="#aaa" class=""></M_Icon>
            </a>
            <DropdownMenu slot="list">
              <div @click="createFile(item)">
                <DropdownItem >新建</DropdownItem>
              </div>
              <div  @click="delFolder(item)">
                <DropdownItem>删除</DropdownItem>
              </div>
            </DropdownMenu>
          </Dropdown>


          <div v-show="open_states[k]">
            <div  v-for="(file, i) in item.child"  :key="i" class="m-aside1-file" >
            <M_Icon type="#icon_excel" :size="24" class="m-aside1-list-item-icon no-select" ></M_Icon>
            <a @click.stop="openFile(file)" class="m-aside1-list-item-title">
              {{file.name}}
            </a>
              <Dropdown trigger="click" >
                <a href="javascript:void(0)">
                  <M_Icon :size="24" type="#btn_more1" color="#aaa" class="m-aside1-list-item-icon"></M_Icon>
                </a>
                <DropdownMenu slot="list">
                  <div  @click="delFile(file, item.name)">
                    <DropdownItem>删除</DropdownItem>
                  </div>
                </DropdownMenu>
              </Dropdown>
          </div>
          </div>

        </div>

      </div>
    </div>



  </div>
</template>

<script>


    export default {
      name: "m_aside1",
      props:{
        list:{
          type: Object,
          default: {"table":{"child":[{"id":6,"name":"ffff","pname":"table","real_name":"1990-01-31","type":"file","user":"a"}],"name":"table"}}
        },
        type:{
          type:String,
          default: 'file'
        }
      },
      data(){
        return {
          search_key:'',

          open_states:[],
          active_item:{},

        }
      },
      methods:{
        init(){
          this.open_states = [];
          this.active_file = {};
        },

        /*------------文件夹操作-----------*/
        //打开/关闭文件夹
        openFolder(index){
          this.a = !this.a;
          this.$set(this.open_states,index,this.a)
        },
        //新建文件夹
        createFolder(){
          this.$emit('create',{type:'folder'});
        },
        delFolder(folder){
          this.$emit('delete',{type:'folder',folder_name:folder.name});
        },
        /*-----------文件操作------------*/
        //新建文件
        createFile(folder){
          this.$emit('create',{type: 'file',folder:folder});
        },
        //点击文件
        openFile(file){
          this.active_item = file;
          this.$emit('openFile',{type: 'file',data: file});
          /*this.$emit('openFile',file);*/
        },
        //删除文件
        delFile(file,folder_name){
          this.active_item = file;
          this.$emit('delete',{type: 'file',folder_name,file_name: file.name});
        },

      },
      filters:{
        folder_icon(open){
          if(open){
            return '#icon_open_folder'
          } else {
            return '#icon_folder'
          }
        },
        f_type(f){
          return 'child' in f ? 'folder': 'file';
        }
      },
      computed:{
        search_reasul(){
          let key = this.search_key;
          let r = []
           /* this.list.filter(item => {
            item.chid = item.chid || []
            let c = item.child.filter(v => {

              v.name = v.name || ''

              return v.name.indexOf(key) >= 0
            })

            return c.length > 0 ;
          })*/

          for(let i in this.list){
            let child = this.list[i].child || []
            child = child.filter(v => {

              v.name = v.name || ''

              return v.name.indexOf(key) >= 0
            })
            if(child.length>0 || key == ''){
              r.push({name:i, child});
            }
          }

          return r

        }
      },
      watch:{
        list:{
          handler(olddata,newdata){
            this.init();
          },
          deep:true
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../style/mixin.scss";
  .m-aside1 {
    @include size(100%, 100%);
    padding: 15px 0;

  }

  $line_hight: 24px;
  .m-aside1-title{
    @include size(100%, $line_hight);
    padding: 0 10px;
    line-height: $line_hight;
  }

  .m-aside1-seach {
    padding: 0 10px;

    &-focus {
      background: url("https://m1.bdp.cn/static/theme/light/svg/aside/search_149eae8.svg") no-repeat center  transparent;
      padding-left: 50%;
    }

    &-item,  &-focus{
      width: 100%;
      border: 0px solid;
      outline:none;
      background-size:80px 60px;
      border-bottom: 1px solid $color-blue1;
    }
    &-focus:focus,  &-item{
      background: url("../assets/icon/search.svg") no-repeat left  transparent;
      background-size:20px 20px;
      transition: all .3s ease-in-out 0s;
      border-bottom: 2px solid $color-blue1;
      padding-left: 28px;
    }
  }

  .m-aside1-list {
    @include size(100%, 90%);

    margin-top: 15px;
    overflow-y:scroll;
    overflow-x:hidden;

  .m-aside1-file{
    padding-left: 15px;
  }

    &-item {
      //position: absolute;
      display: block;
      @include size(100%, auto);
      padding-left:10px;

      &-title {
        position: relative;
        top: -5px;
        display: inline-block;
        @include size(180px, 100%)
      }
      &-icon {
        //position: relative;
        //top: 5px;
      }
    }

  }
</style>

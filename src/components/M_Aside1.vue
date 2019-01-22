<template>
  <div class="m-aside1">
    <!--功能名称-->
    <div class="m-aside1-title">
      <div class="g-fl f-b f-12">数据表</div>
      <M_Icon :size="24" type="#icon_refresh" :isbtn="true" color="#aaa" class="g-fr" @click="refreshTree()"></M_Icon>
      <M_Icon :size="24" type="#btn_add" :isbtn="true" color="#aaa" class="g-fr" @click="createFolder()"></M_Icon>
    </div>
    <!--查找-->
    <div class="m-aside1-seach">
      <input type="text" v-model="search_key" class="m-aside1-seach-item">
    </div>
    <!--列表-->
    <div class="m-aside1-list">
      <div v-for="(item, k) in search_reasul" :key="k" class="m-aside1-list-item">

        <div class="m-aside1-folder">
          <!--文件夹-->
          <div class="folder-title">
            <M_Icon :type="open_states[k] | folder_icon" :size="24" class="m-aside1-list-item-icon"></M_Icon>
            <a @click="openFolder(k)" class="g-nowrap m-aside1-list-item-title no-select">
              {{item.name}}
            </a>

            <div class="folder-drop">
              <Dropdown class="m-aside1-drapdown" trigger="click">
                <a href="javascript:void(0)">
                  <M_Icon :size="24" type="#btn_more1" class=""></M_Icon>
                </a>
                <DropdownMenu slot="list">
                  <div @click="createFile(item)">
                    <DropdownItem>新建</DropdownItem>
                  </div>
                  <div @click="delFolder(item)">
                    <DropdownItem>删除</DropdownItem>
                  </div>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <!--文件夹下的表-->
          <div v-show="open_states[k]">
            <div v-for="(file, i) in item.child" :style="active_index === i ? 'background: #ddd' : ''" :key="i"
                 class="m-aside1-file">
              <Tooltip :content="file.name" placement="right">
                <M_Icon type="#icon_excel" :size="24" class="m-aside1-list-item-icon no-select"></M_Icon>
                <a @click.stop="openFile(file,i)" class="g-nowrap m-aside1-list-item-title">
                  {{file.name}}
                </a>
                <div class="table-drop">
                  <Dropdown trigger="click">
                    <a href="javascript:void(0)">
                      <M_Icon :size="24" type="#btn_more1" color="#aaa" class="m-aside1-list-item-icon"></M_Icon>
                    </a>
                    <DropdownMenu slot="list">
                      <div @click="delFile(file, item.name)">
                        <DropdownItem>删除</DropdownItem>
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </Tooltip>
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
    props: {
      list: {
        type: Object,
        default: {
          "table": {
            "child": [{
              "id": 6,
              "name": "ffff",
              "pname": "table",
              "real_name": "1990-01-31",
              "type": "file",
              "user": "a"
            }], "name": "table"
          }
        }
      },
      type: {
        type: String,
        default: 'file'
      }
    },
    data() {
      return {
        //搜索表关键字
        search_key: '',

        open_states: [],
        active_item: {},
        active_index: '',
      }
    },
    methods: {
      init() {
        this.open_states = [];
        this.active_file = {};
      },

      //刷新文件树
      refreshTree(){
        this.$emit('refreshTree')
      },
      /*------------文件夹操作-----------*/
      //打开/关闭文件夹
      openFolder(index) {
        this.a = !this.a;
        this.$set(this.open_states, index, this.a)
      },
      //新建文件夹
      createFolder() {
        this.$emit('create', {type: 'folder'});
      },
      delFolder(folder) {
        this.$emit('delete', {type: 'folder', folder_name: folder.name});
      },
      /*-----------文件操作------------*/
      //新建文件
      createFile(folder) {
        this.$emit('create', {type: 'file', folder: folder});
      },
      //点击文件
      openFile(file, i) {
        this.active_item = file;
        this.active_index = i;
        this.$emit('openFile', {type: 'file', data: file});
        /*this.$emit('openFile',file);*/
      },
      //删除文件
      delFile(file, folder_name) {
        this.active_item = file;
        this.$emit('delete', {type: 'file', folder_name, file_name: file.name});
      },

    },
    filters: {
      //区分文件夹或表的显示UI
      folder_icon(open) {
        if (open) {
          return '#icon_open_folder'
        } else {
          return '#icon_folder'
        }
      },
      f_type(f) {
        return 'child' in f ? 'folder' : 'file';
      }
    },
    computed: {
      //页面实际显示的树形结构数据
      search_reasul() {
        let key = this.search_key;
        let r = []

        for (let i in this.list) {
          let child = this.list[i].child || []
          child = child.filter(v => {

            v.name = v.name || ''

            return v.name.indexOf(key) >= 0
          })
          if (child.length > 0 || key == '') {
            r.push({name: i, child});
          }
        }

        return r

      }
    },
    watch: {
      //目录变动初始化页面
      list: {
        handler(olddata, newdata) {
          this.init();
        },
        deep: true
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
  .m-aside1-title {
    @include size(100%, $line_hight);
    padding: 0 10px;
    line-height: $line_hight;

  }

  .m-aside1-seach {
    padding: 0 10px;

    &-focus {
      background: url("https://m1.bdp.cn/static/theme/light/svg/aside/search_149eae8.svg") no-repeat center transparent;
      padding-left: 50%;
    }

    &-item, &-focus {
      width: 100%;
      border: 0px solid;
      outline: none;
      background-size: 80px 60px;
      border-bottom: 1px solid $color-blue1;
    }
    &-focus:focus, &-item {
      background: url("../assets/icon/search.svg") no-repeat left transparent;
      background-size: 20px 20px;
      transition: all .3s ease-in-out 0s;
      border-bottom: 2px solid $color-blue1;
      padding-left: 28px;
    }
  }

  .m-aside1-list {
    @include size(100%, 90%);

    margin-top: 15px;
    overflow-y: scroll;
    overflow-x: hidden;

    .m-aside1-file {
      padding-left: 15px;
    }

    &-item {
      //position: absolute;
      display: block;
      @include size(100%, auto);
      padding-left: 10px;

      &-title {
        @include size(180px, 100%);
        display: inline-block;
        color: black;
        font-size: 10px;
      }
      &-icon {
        //position: relative;
        //top: 5px;
      }
    }

  }
</style>

<style lang="scss">

  .m-aside1 {
    //复写下拉样式
    .ivu-select-dropdown {
      margin: 0 0;
      width: 60px;
      padding: 4px 8px;
    }
  }

  //鼠标移入背景变色、显示下拉按钮
  .folder-title {
    .folder-drop {
      display: none;
    }
  }

  .folder-title:hover {
    background: #f2f2f2;
    .m-aside1-list-item-title {

    }
    .folder-drop {
      display: inline-block;
    }
  }

  .m-aside1-file {
    .table-drop {
      display: none;
    }
  }

  .m-aside1-file:hover {
    background: #f2f2f2;
    .table-drop {
      display: inline-block;

    }
  }

</style>

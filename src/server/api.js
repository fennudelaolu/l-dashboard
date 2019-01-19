/**
 * Created by lulu on 2018/3/23.
 * api
 */
import req from "./axios_conf";

import {findErrorInfo, findErrorInfoHaveCode} from './api_error_dictionary.js'
//import {getEL_ATTR} from "../config/mUtils";
import store from '../store/store'
import * as types from '../store/types'

let server_url = 'http://192.168.110.129:5000'


export const RESULT_CODE = {
    edit: 201,
    find: 200,
    del: 204,
    del_r: 202,
    add: 201,
    update: 201,
};

/*用户登陆/管理*/
export const LOGIN_API = {
  async login(data) {
    let login_url = server_url+'/login';

    let param = {
      login_name:data.login_name ,
      password: data.password,
      code: data.code
    };
    let r = await req.post_form(login_url,{ param});
    return r

  },
  logout() {
    store.commit(types.USER, null);
    window.location.href = '/'
  }
};

//数据管理
export const DATA_MANAGER_API = {
  async test(){
    let formdata = {a:'test'};
    let param = {a: 'param'}
    let r = await req.post_form(server_url,{ formdata,param});
    // let r = await req.get(server_url,{});
    console.log(r)
  },

  createFolder_url: server_url + '/table/createFolder',//创建文件夹
  createTable_url:  server_url + '/table/createTable',//创建表
  inputData_url:  server_url + '/table/input_data',//数据导入（新建表、追加）
  delFolder_url:  server_url + '/table/del_folder',//删除文件夹
  delTable_url:  server_url + '/table/del_table',//创建表
  findTree_url:  server_url + '/table/find_tree',//获取目录
  getTable_url:  server_url + '/table/get_table',//获取表数据

  //获取目录
  async findTree(){
    let param = {};
    let r = await req.post_json(this.findTree_url,{});
    return r;
  },

  //创建文件夹
  async createFolder(folder_name){
    let param = {folder_name: folder_name};
    let r = await req.post_form(this.createFolder_url,{param});
    return r;
  },

  //删除文件夹
  async delFolder({folder_name}){
    let param = {folder_name: folder_name};
    let r = await req.post_form(this.delFolder_url,{param});
    return r;
  },

  //创建表
  async createTable({folder_name, table_name, columns, note, head}){

    let param = {
      folder_name, table_name, columns, note, head
    }
    let r = await req.post_json(this.createTable_url,{param});
    return r;
  },

  //删除表
  async delTable({folder_name, table_names}){
    let param = {
      folder_name, table_names
    }
    let r = await req.post_json(this.delTable_url,{param});
    return r;
  },

  // 数据导入（向表追加数据）
  async inputData({folder_name, table_name, up_data }){
    let param = {folder_name, table_name, up_data};
    console.log(param)
    let r = await req.post_json(this.inputData_url,{ param});
    console.log(r)
  },

  //分页获取数据
  async getTableByPage({real_name, start, end}){

    let formdata = {real_name, start, end}
    let r = await req.get(this.getTable_url,{  formdata});
    return r
  }






};

//图表数据
export const CHART_API = {
  //分组查询一个或多个值

  //
}


/*对api返回信息集中处理*/
function checkdata(result) {

  let status = result.status
  if (status == 201 || status == 200 || status == 204 || status == 202) {
    let data = result.data || {}
    let code = data.code || false
    if (code) {
      let msg = data.msg || result.statusText || ''
      findErrorInfoHaveCode(msg)
    }
  } else {
    result.statusText = findErrorInfo(result.statusText) || result.statusText
  }
  return result;
}

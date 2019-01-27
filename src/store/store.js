/**
 * Created by superman on 17/2/16.
 */

const Vuex = require('vuex')
const Vue = require('vue')
import * as types from './types'
import * as api from '../server/api'
import {JSONtoObject, ObjecttoJSON} from "../config/mUtils.js"

Vue.use(Vuex);
export default new Vuex.Store({
    state (){
        return {
          //用户登陆信息
          user: null,
          //展示大屏幕配置
          screen_option: null,


        }
    },
    modules: {
    },
    mutations: {
        [types.SCREEN_OPTION]: (state, data) => {
            state.screen_option = data;
        },

        [types.USER]: (state, data) => {
            state.user = data;
            localStorage.setItem(types.USER, JSON.stringify(data));
        },
    },
    getters: {

      screen_option: (state) => {
            return state.screen_option;
        },

      user: (state) => {
            if (!state.user) {
                state.user = JSON.parse(localStorage.getItem(types.USER));
            }
            return state.user;
        },


    },
    action: {
      // todo 文件夹异步读取
      getExcelFolderApi({commit}) {
        api.DATA_MANAGER_API.findTree().then(res => {
        })
      },

    }
})

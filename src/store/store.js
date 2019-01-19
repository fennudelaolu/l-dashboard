/**
 * Created by superman on 17/2/16.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import * as api from '../server/api'
import {JSONtoObject, ObjecttoJSON} from "../config/mUtils.js"

Vue.use(Vuex);
export default new Vuex.Store({
    state (){
        return {
            //api地址
            api_url: '',
            user: null,
        }
    },
    modules: {
    },
    mutations: {
        [types.api_url]: (state, data) => {
            state.api_url = data;
        },

        [types.LOGIN]: (state, data) => {
            localStorage.token = data;
            state.token = data;
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            state.token = null
        },

        [types.USER]: (state, data) => {
            state.user = data;
            localStorage.setItem(types.USER, JSON.stringify(data));
        },
    },
    getters: {

        api_url: (state) => {
            return state.api_url;
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

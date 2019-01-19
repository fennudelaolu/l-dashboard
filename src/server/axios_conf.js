/**
 * Created by lulu on 2018/3/23.
 * axios请求集中配置
 */
//引入axios
import axios from "axios";
import qs from "qs";
import router from '../router/index.js'
import store from "../store/store";
import * as types from "../store/types";


let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;

//axios.defaults.baseURL = 'https://api.example.com';		//不用重复去写url
axios.defaults.headers.common['Authorization'] = 'luzhenjiang';	//不用重复去传token
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// http request 拦截器
axios.interceptors.request.use(
    config => {


        /*取消重复请求，保留最新*/
        let pass = white_list.filter(item => {
            return config.url.indexOf(item) != -1;
        })
        if (pass.length == 0) {
            console.log(config.url)
            if (promiseArr[config.url]) {
                console.log("out")
                promiseArr[config.url]('请求频繁，操作取消')
                promiseArr[config.url] = cancel
            } else {
                console.log("pass")
                promiseArr[config.url] = cancel
            }
        }
        /*  保存登录状态
       if (store.state.token) {
            如果需要保存登录状态，这里解除注销
            config.headers.authentication_token = `${store.state.token}`;
        }*/
      let user = store.getters[types.USER] || {}
      config.headers['user-token'] = user.token || '' ;
      config.headers['Access-Control-Expose-Headers'] = "*" ;
      config.headers['Access-Control-Allow-Headers'] = "Content-Type,Access-Token" ;
      config.headers['Access-Control-Allow-Methods'] = "*" ;
      config.headers['Access-Control-Allow-Credentials'] = "true" ;




        return config;
    },
    err => {
        return Promise.reject(err);
    });


//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    return response
}, error => {
    let data = {}
    try {
        data = error.response.data || {}
    } catch (e) {
        data = error
    }

    let status;
    let msg;

    try {
        msg = data.message || data.statusText || ''

        if (msg === '') {
            status = 500
            msg = '连接服务器失败'
        } else if (msg === '请求频繁，操作取消') {
            status = data.status || -500
        }
    } catch (err) {
        status = 500
        msg = '连接服务器失败'
    }
    console.log(data)
    let err = {
        status: status,
        statusText: msg,
        data: {}
    }


    if (status) {

        switch (status) {
            case 401:
                err.statusText = '未授权，请重新登录'
                // 401 清除token信息并跳转到登录页面
                /*store.commit(types.LOGOUT);*/
                router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                })

                break;
            case 302:
                err.statusText = '未授权，请重新登录'
                // 401 清除token信息并跳转到登录页面
                /*store.commit(types.LOGOUT);*/
                router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                })

                break;
            case 403:
                err.statusText = '未授权，请重新登录'
                // 401 清除token信息并跳转到登录页面
                /*store.commit(types.LOGOUT);*/
                router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                })

                break;
            case -500:
                err.statusText = '操作频繁';
                break;

        }
    } else {
        //err.statusText = "连接到服务器失败"
    }
    return Promise.resolve(err)
})
//添加前缀
/*axios.defaults.baseURL = 'http://本地测试集群地址'*/
axios.defaults.baseURL = '';
//设置默认请求头
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.timeout = 60000

export default {

    /**
     * xxx_json param以json形式发送
     * xxx_form param以form形式发送
     * @param {param, formdata} 可选 JSON param ：json形式传输；JSON formdata ：?xxx=xxx&xxx=ccc
     * */
    get(url, {param, formdata}) {

        let data = this.dataformat(url, {param, formdata});
        param = {
            params: data.param
        }
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: data.url,
                param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res)
            })
        })
    },
    post_json (url, {param, formdata}) {

        let data = this.dataformat(url, {param, formdata});
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: data.url,
                data: data.param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {

                resolve(res)
            })
        })
    },
    //遍历param
    post_form (url, {param, formdata}) {
        return new Promise((resolve, reject) => {
            let data = this.dataformat(url, {param, formdata});
            axios({
                method: 'post',
                url: data.url,
                headers: {'Content-type': 'application/x-www-form-urlencoded'},
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                data: data.param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res)
            })
        })
    },
    //不遍历
    post_form3 (url, {param, formdata}) {
        if (typeof formdata !== 'undefined') {
            url += '?' + qs.stringify(formdata)
        }

        param = param || {}

        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,

                data: param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res)
            })
        })
    },
    delete(url, {param, formdata}) {
        let data = this.dataformat(url, {param, formdata});

        return new Promise((resolve, reject) => {
            axios({
                method: 'delete',
                url: data.url,
                data: data.param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {

                resolve(res)
            })
        })
    },
    /*util*/
    dataformat(url, {param, formdata}){
        formdata = formdata || '';
        if (formdata !== '') {
            url += '?' + qs.stringify(formdata);
        }
        param = param || {};
        return {url, param};
    }
}

/*重复请求拦截白名单*/
const white_list = [
    '/table/input_data',//test
    '/table/createTable',
  
]


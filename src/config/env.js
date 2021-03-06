/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
let routerMode = 'hash';//history || hash
let imgBaseUrl;


if (process.env.NODE_ENV == 'development') {
  baseUrl = 'http://127.0.0.1:5000';
  imgBaseUrl = 'http://cangdu.org:8001/img/';

}else if(process.env.NODE_ENV == 'production'){
  baseUrl = 'http://47.102.114.92:8888';
  imgBaseUrl = 'http://cangdu.org:8001/img/';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}

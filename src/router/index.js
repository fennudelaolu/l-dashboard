import Vue from 'vue';
import Router from 'vue-router';

import store from '../store/store';
import * as types from '../store/types';
import {routerMode} from '@/config/env';

const page = name =>()=> import('@/page/'+name)

Vue.use(Router)
const routes = [
  {path: '/login' , name: '登陆', component: page('login')},
  {path: '/make_screen' , name: '大屏幕制作', props:true, component: page('screen/MakeScreen')},
  {path: '/big_screen' , name: '大屏幕展示', props:true, component: page('screen/BigScreen')},
  {
    path: '/' , name: '首页', component: page('layout'), redirect:'/datasource',  meta: {requireAuth: true},
    children: [
      {path:'/datasource', name:'数据表', component: page('datasource/DataSource.vue')},

      {path:'/chart_list', name:'图表列表', props:true,component: page('chart/ChartList')},
      {path:'/make_chart', name:'图表制作', props:true, component: page('chart/MakeChart')},

      {path:'/screen_list', name:'大屏幕列表', props:true,component: page('screen/ScreenList')},
    ]
  }
]

const router = new Router({mode: routerMode, routes: routes});

router.beforeEach((to, from, next) => {
  let userinfo = store.getters[types.USER] || null
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (userinfo) {
      if (to.path === "/index") {
        next()
      } else {
        next();
      }

    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }

});

export default router;

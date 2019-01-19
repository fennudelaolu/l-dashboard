import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store';
import * as types from '../store/types';
import {routerMode} from '@/config/env';

import login from '@/page/login'
import layout from '@/page/layout';
import datasource from '@/page/datasource/DataSource.vue';

//图表页
import chart_list from '@/page/chart/ChartList'
import make_chart from '@/page/chart/MakeChart'

//大屏幕页
import screen_list from '@/page/screen/ScreenList'
import make_screen from '@/page/screen/MakeScreen'

Vue.use(Router)
const routes = [
  {path: '/login' , name: '登陆', component: login},
  {path: '/make_screen' , name: '大屏幕制作', props:true, component: make_screen},
  {
    path: '/' , name: '首页', component: layout, redirect:'/datasource',  meta: {requireAuth: true},
    children: [
      {path:'/datasource', name:'数据表', component: datasource},

      {path:'/chart_list', name:'图表列表', props:true,component: chart_list},
      {path:'/make_chart', name:'图表制作', props:true, component: make_chart},

      {path:'/screen_list', name:'大屏幕列表', props:true,component: screen_list},
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

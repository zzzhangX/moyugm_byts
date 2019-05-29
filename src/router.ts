import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      component: (resolve) => require(['./views/Home/Home.vue'], resolve),
      children: [
        {
          path: '',
          component: (resolve) => require(['./views/Home/PlayerAccountInfo.vue'], resolve),
          meta: { title: 'sidebar.home' }
        },
        {
          path: '/playerRoleInfo',
          component: resolve => require(['./views/Home/PlayerRoleInfo.vue'], resolve),
          meta: { title: 'sidebar.playerRoleInfo' }
        },
        {
          path: '/currencySetting',
          component: resolve => require(['./views/Home/CurrencySetting.vue'], resolve),
          meta: { title: 'sidebar.currencySetting' }
        },
        {
          path: '/rankingList',
          component: resolve => require(['./views/Home/RankingList.vue'], resolve),
          meta: { title: 'sidebar.rankingList' }// 排行榜
        },
        {
          path: '/recharge',
          component: resolve => require(['./views/Home/Recharge.vue'], resolve),
          meta: { title: 'sidebar.recharge' }// 充值相关
        },
        {
          path: '/backpackInfo',
          component: resolve => require(['./views/Home/BackpackInfo.vue'], resolve),
          meta: { title: 'sidebar.backpackInfo' }
        },
        {
          path: '/changeexp',
          component: resolve => require(['./views/Home/Changeexp.vue'], resolve),
          meta: { title: 'sidebar.changeExp' }
        },
        {
          path: '/phantomInfo',
          component: resolve => require(['./views/Home/PhantomInfo.vue'], resolve),
          meta: { title: 'sidebar.phantomInfo' }
        },
        {
          path: '/trusteeship',
          component: resolve => require(['./views/Home/Trusteeship.vue'], resolve),
          meta: { title: 'sidebar.trusteeship' }
        },
        {
          path: '/horseRaceLamp',
          component: resolve => require(['./views/Home/HorseRaceLamp.vue'], resolve),
          meta: { title: 'sidebar.horseRaceLamp' }
        },
        {
          path: '/whiteList',
          component: resolve => require(['./views/Home/WhiteList.vue'], resolve),
          meta: { title: 'sidebar.whiteList' }
        },
      ]
    },
  ],
});

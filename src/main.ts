import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
// import VueI18n from 'vue-i18n';
// import zh from './lang';
import axios from 'axios';
import ElementUI from 'element-ui';
// @ts-ignore
import VueClipboard from 'vue-clipboard2';
import i18n from './i18n';
VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(VueClipboard);  // 必须这样子引用 否则会报错的
// Vue.use(VueI18n);

Vue.config.productionTip = false;
// axios.defaults.crossDomain = true;
axios.defaults.headers["Content-Type"] = "application/json";

let loading: { close: { (): void; (): void; }; } | null = null;
// request 拦截器
axios.interceptors.request.use((config) => {
  // 为post请求加上loading
  if (config.method === 'post') {
    loading = ElementUI.Loading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    });
  }
  config.headers['Content-Type'] = 'application/json; charset=UTF-8';
  // 判断是否存在token，如果存在将每个请求header都添加token
  if (localStorage.getItem('token')) {
    config.headers.common.Authentication = localStorage.getItem('token');
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// response 拦截器
axios.interceptors.response.use(
  (response) => {
    // tslint:disable-next-line: no-unused-expression
    loading && loading.close();
    return response;
  },
  (error) => {
    // tslint:disable-next-line: no-unused-expression
    loading && loading.close();
    if (error.response) {
      switch (error.response.status) {
        case 403:
          localStorage.removeItem('username');
          localStorage.removeItem('token');
          router.replace({
            path: '/',
          });
          break;
        default:
          ElementUI.Message.error(error.response.status + ':' + error.response.statusText);
          break;
      }
    }
    return Promise.reject(error);
  });

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') || to.path === '/') {
    next();
  } else {
    next('/');
  }
});



// const i18n = new VueI18n({
//   locale: 'zh-CN', // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
//   messages: {
//     'zh-CN': require('./lang/zh'), // 中文语言包
//     'en-US': require('./lang/en'), // 英文语言包
//   },
// });
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');

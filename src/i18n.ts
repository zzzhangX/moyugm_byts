import Vue from 'vue';
// import locale from 'element-ui/lib/locale';
import VueI18n from 'vue-i18n';
import zh from './lang/zh'
import en from './lang/en'
Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'zh-CN', // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
    messages: {
        'zh-CN': zh, // 中文语言包
        'en-US': en, // 英文语言包
    },
});
export default i18n;
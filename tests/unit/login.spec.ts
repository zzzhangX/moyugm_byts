jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: 2 }))
}));
import { mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import ElementUI from 'element-ui';
import i18n from "@/i18n"
import Login from '@/views/Login.vue';
const localVue = createLocalVue()
import axios from 'axios';
Vue.use(ElementUI);
describe('Login.vue登录功能', () => {
    let wrapper = mount(Login, {
        i18n,
        localVue
    });
    beforeEach(() => {
        wrapper = mount(Login, {
            i18n,
            localVue
        })
        jest.resetModules()
        jest.clearAllMocks()
    })
    it('登录测试，模拟axios', async () => {
        const vm: any = wrapper.vm
        wrapper.setData({
            ruleForm: {
                username: "admin",
                password: "111111"
            }
        })
        const ruleForm = {
            username: "admin",
            password: "111111"
        };
        const result = await vm.submitForm()
        expect(result).toEqual({ data: 2 })
        expect(axios.post).toBeCalledWith('api/auth/login', ruleForm)
    });
});
jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: 2 }))
}));
import { mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import ElementUI from 'element-ui';
import i18n from "@/i18n"
import Header from '@/components/Header.vue';
const localVue = createLocalVue()
import axios from 'axios';
Vue.use(ElementUI);
describe('Header测试', () => {
    let wrapper = mount(Header, {
        i18n,
        localVue
    });
    beforeEach(() => {
        wrapper = mount(Header, {
            i18n,
            localVue
        })
        jest.resetModules()
        jest.clearAllMocks()
    })
    it('加载服务器列表', async () => {
        const vm: any = wrapper.vm
        const result = await vm.serverList()
        expect(result).toEqual({ data: 2 })
        expect(axios.get).toBeCalledWith('api/config/serverlist')
    });
});
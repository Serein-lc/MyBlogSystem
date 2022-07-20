//入口文件

import "./mock"; //让所有的mock跑一遍，后期不用模拟某一个板块了就可以直接进入这个index文件里面注释掉不想要模拟的那个板块。


import Vue from 'vue';
import App from './App.vue';
import './style/global.less';
import router from "./router";
import { showMessage } from './utils';
import "@/eventBus"
import store from "@/store"
store.dispatch("setting/fetchSetting")
    // 注册自定义全局指令
import vLoading from "@/directives/loading"
import vLazy from "@/directives/lazy"
Vue.directive("loading", vLoading)
Vue.directive("lazy", vLazy)


Vue.prototype.$showMessage = showMessage;
new Vue({
    // 当我们new了一个router实例以后需要将router实例配置到Vue中去
    router,
    store,
    render: h => h(App),
}).$mount('#app');


// 测试



// import { getSetting } from "@/api/setting"

// getSetting().then((resp) => {
//     console.log(resp)
// })
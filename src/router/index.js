// 使用Vue-router，实现单页面应用，且无刷新切换页面
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"
Vue.use(VueRouter); //使用一个vue插件vue-router
import { titleController } from "@/utils"



const router = new VueRouter({
    //router的配置
    routes, // routes 路由配置，是一个数组，数组里定义规则，每一个规则是一个对象
    mode: "history",
})

router.afterEach((to, from) => {
    if (to.meta.title) {
        titleController.setRouteTitle(to.meta.title)
    }
})
export default router;
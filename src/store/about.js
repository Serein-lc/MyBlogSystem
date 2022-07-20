// 因为api使用的不是默认导出，这里请用花括号
import { getAbout } from "@/api/about";


export default {
    namespaced: true,
    state: {
        loading: false,
        data: "",

    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setData(state, payload) {
            state.data = payload;
        }
    },
    actions: {
        async fetchAbout(ctx) {

            // 判断当前是否已经拿过数据，就是用户已经加载过这个页面，但是跳转了其他页面再回来，如果是，就不用再次请求了，因为这里的数据基本上是不怎么变化的，用户加载过之后就已经在仓库中了
            if (ctx.state.data) {
                return
            }

            ctx.commit("setLoading", true);
            const resp = await getAbout();
            ctx.commit("setData", resp);
            ctx.commit("setLoading", false)
        }
    }
}
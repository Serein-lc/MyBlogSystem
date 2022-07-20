// 因为api使用的不是默认导出，这里请用花括号
import { getSetting } from "@/api/setting";
import { titleController } from "@/utils"

export default {
    namespaced: true,
    state: {
        loading: false,
        data: null,

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
        async fetchSetting(ctx) {
            ctx.commit("setLoading", true);
            const resp = await getSetting();
            ctx.commit("setData", resp);
            ctx.commit("setLoading", false)
                // 获取网站标题
            if (resp.siteTitle) {
                titleController.setSiteTitle(resp.siteTitle)
            }
            // 设置标题旁边的icon
            if (resp.favicon) {
                //<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
                let link = document.getElementsByTagName("link[ref=shorcut icon]");
                if (link) {
                    return
                } else {
                    link.rel = "icon";
                    link.type = "imges/x-icon";
                    link.href = resp.favicon;
                    document.querySelector("head").appendChild(link)
                }

            }

        }
    }
}
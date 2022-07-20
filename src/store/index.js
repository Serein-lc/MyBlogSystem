import Vuex from "vuex";
import Vue from "vue";
import banner from "@/store/banner";
import setting from "@/store/setting";
import about from "@/store/about";
import project from "@/store/project"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        banner,
        setting,
        about,
        project

    },
    strict: true,
})
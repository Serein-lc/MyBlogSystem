// 封装了一个axios实例，实现拦截器

import { showMessage } from "@/utils";
import axios from "axios"

const ins = axios.create(); //创建一个axios实例，如下面判断情况，由于当不成功的情况是可以通用的，所以是可以通过axios的实例方法，来拦截状态的
// 创建的axios实例和我们直接用axios是一模一样的，用法完全一样，但是这个实例提供了一个拦截器，当使用了拦截器后，请求到的数据会先运行这个函数，再把这个函数的返回结果给最终我们定义的地方

ins.interceptors.response.use(function(resp) {
    if (resp.data.code !== 0) {
        showMessage({
            content: resp.data.msg,
            type: "error",
        });
        return null;
    }
    return resp.data.data;
})

export default ins;

/**
 *  写拦截器的目的，就是在以后的其他组件代码中，当使用了请求数据的时候（这里的code是本项目的开发说明文档规定的，具体的项目要看具体的说明文档）
 *  如果消息体中的code为0，代表没有出错那么就直接返回业务数据，
    如果消息体中的code不为0，代表出错了，这个时候将msg中的报错信息，通过showMessage显示在页面中
 */
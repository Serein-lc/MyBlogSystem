// 制作页面切换，出现loading效果

import loadingUrl from "@/assets/loading.svg";
import styles from "@/directives/loading.module.less";


function getLoadingImg(el) {
    // 得到el中loading效果的img元素
    return el.querySelector("img[data-role=loading]");
}

function createLoadingImg() {
    const img = document.createElement("img");
    img.dataset.role = "loading";
    img.src = loadingUrl;
    img.className = styles.loading
    return img;
}


// 导出自定义指令的配置对象
export default function(el, binding) {
    // 根据binding.value的值决定创建或删除img元素
    const curimg = getLoadingImg(el);
    if (binding.value) {
        if (!curimg) {
            const img = createLoadingImg();
            el.appendChild(img)
        }
    } else {
        if (curimg) {
            curimg.remove()
        }
    }
}




// export default {
//     // 这里面配置的基本上是一些钩子函数，每个钩子函数调用时，vue都会向其传递一些参数，其中最重要的就是前两个参数，
//     // el：被绑定元素对应的真是DOM      binding：是一个对象，描述了指令中提供的信息

//     bind(el, binding) {
//         // 只调用一次，指令第一次绑定到元素时调用，在这里可以进行一次性的初始化设置

//         // 创建一个img元素，放到el的内部
//         const img = document.createElement("img");
//         img.src = "@/assets/loading.svg";
//         if (binding.value) {

//         } else {

//         }

//         console.log(img)

//     },

//     // inserted() {
//     //     // 被绑定元素插入父节点时调用

//     // },
//     update(el, binding) {
//         // 所有组件的VNode更新时调用

//         // 根据binding.value的值，决定创建或者删除img元素
//     }
// }
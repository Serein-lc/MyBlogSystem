import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon";
import styles from "./showMessage.module.less"
/**
 * 弹出消息
 * @param {*} content  消息内容
 * @param {*} type    消息类型    info error success warn
 * @param { } duration  多久后消失
 * @param {*} container   容器，消息会显示在容器的中间 不传则显示在页面中间   content, type = "info", duration, container
 */
export default function(options = {}) {
    const content = options.content || "";
    const type = options.type || "info";
    const duration = options.duration || 1000;
    const container = options.container || document.body
        // 创建元素
    const div = document.createElement('div');
    const iconDom = getComponentRootDom(Icon, { type });
    div.innerHTML = `<span class=${styles.icon}>${iconDom.outerHTML}</span><div>${content}</div>`;

    // 设置样式
    const typeClassName = styles[`message-${type}`]; //类型样式，css module编译后会导出一个对象，里面就是类名的对应关系，通过拼接，设置类名
    div.className = `${styles.message} ${typeClassName}`;

    //将div放进容器中

    if (options.container) {
        //想要在容器中居中，父级元素的position不能是默认的static，其他的都可以，所以判断容器的position是否改过
        if (getComputedStyle(container).position === "static") {
            container.style.position = "relative";
        }
    }


    container.appendChild(div);

    //让浏览器强行渲染，这样动画才会出来
    div.clientHeight;

    //回归到正常位置 开始的位置是用了translate向下平移了
    div.style.opacity = 1;
    div.style.transform = `translate(-50%, -50%)`;

    // 等一段时间消失
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = `translate(-50%,-50%) translateY(-15px)`;
        div.addEventListener(
            "transitionend",
            function() {
                div.remove();
                // 如果有回调函数，就运行回调函数
                options.callBack && options.callBack()
            }, { once: true })
    }, duration)
}
// export { default as showMessage } from "./showMessage.js";
// 运行showMessage.js实现在某块区域弹出消息框
import showMessage from "./showMessage";
export { showMessage };


// export { default as getComponentRootDom } from "./getComponentRootDom.js"
// 得到某个元素的真实Dom树
import getComponentRootDom from "./getComponentRootDom";
export { getComponentRootDom };


// 传入一个时间戳返回一个时间，
import formatDate from "./formatDate";
export { formatDate };

// 函数防抖
import debounce from "./debounce";
export { debounce };

// 设置网站标题
import titleController from "./titleController";
export { titleController };
//事件总线

// const listeners = {};

// export default {
//     // 监听某一个事件
//     $on(eventName, handler) {
//         if (!listeners[eventName]) {
//             listeners[eventName] = new Set()
//         }
//         listeners[eventName].add(handler)
//     },


//     // 取消监听某一个事件
//     $off(eventName, handler) {
//         if (!listeners[eventName]) {
//             return;
//         }
//         listeners[eventName].delete(handler)
//     },


//     // 触发某一个事件
//     $emit(eventName, ...args) {
//         if (!listeners[eventName]) {
//             return;
//         }
//         for (const handler of listeners[eventName]) {
//             handler(...args)
//         }

//     }
// }

/**
 * 事件名： mainScroll
 * 含义：主区域滚动位置发生变化后触发
 * 参数：
 *  -  滚动的dom元素
 */
import Vue from "vue";
const app = new Vue({})
Vue.prototype.$bus = app
export default app
<!-- 图标组件 -->

<template>
      <i class="iconfont icon-container"
     :class="fontClass"></i>
</template>

<script>

// 将我们在iconfont网站中的图表样式做一个映射关系，这样我们在使用模板的时候可以更加有语义化，通过computed计算属性来设置类名
const classMap = {
  home: "icon-shouye",
  success: "icon-zhengque",
  error: "icon-cuowu",
  close: "icon-guanbi",
  warn: "icon-jinggao",
  info: "icon-xinxi",
  blog: "icon-blog",
  code: "icon-code",
  about: "icon-about",
  weixin: "icon-weixin",
  mail: "icon-email",
  github: "icon-github-fill",
  qq: "icon-QQ-circle-fill",
  arrowUp: "icon-xiangshang",
  arrowDown: "icon-xiangxia",
  empty: "icon-empty",
  chat: "icon-liuyan",
};



export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    fontClass () {
      return classMap[this.type]
    }
  },
};
</script>
    


<style scoped>
/* 将我们在iconfont网站中的引用进来 */
@import '//at.alicdn.com/t/font_3409083_ltqc8c3ci8.css';

.iconfont {
  color: inherit;
  font-size: inherit;
}
</style>
<!-- 首页内容区图片加载组件 -->
<template>
  <div class="ImgLoader-container">
    <img class="placeholder" :src="placeholder" alt="" v-if="!allLoaded" />
    <img
      class="original"
      :src="src"
      alt=""
      @load="handleLoad"
      :style="{ opacity: changeImgOpacity, transition: `${duration}ms` }"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  // 这边要使用data的原因是，当要改变原图的透明度的时候，不能像之前一样直接获取到该元素，做vue开发一定是以数据为主，而我们的透明度就是一个可以变化的数据，所以我们可以
  // 在这里使用上data，
  data() {
    return {
      imgIsLoad: false, //图片(原图)是否加载完成
      allLoaded: false, //是否所有事情都完成了
    };
  },
  computed: {
    changeImgOpacity() {
      return this.imgIsLoad ? 1 : 0;
    },
  },
  methods: {
    handleLoad() {
      this.imgIsLoad = true;
      setTimeout(() => {
        this.allLoaded = true;
        this.$emit('load');
      }, this.duration);
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../style/mixin.less';
.ImgLoader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(2vw);
  }
}
</style>

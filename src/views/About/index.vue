<!-- main区域关于我页面 -->
<template>
  <div class="about-container" v-loading="loading || !srcLoaded">
    <iframe
      @load="srcLoaded = true"
      class="about-content"
      :src="src"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      srcLoaded: false, //是否加载完成
    };
  },
  created() {
    this.$store.dispatch('about/fetchAbout');
  },
  computed: mapState('about', {
    src: 'data', //可以通过这种方式来改名字
    loading: 'loading',
  }),
};
</script>

<style lang="less">
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.about-content {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
}
</style>

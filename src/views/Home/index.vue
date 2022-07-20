<!-- main区域首页页面 -->
<template>
  <div
    class="home-container"
    ref="container"
    @wheel="handleWheel"
    v-loading="loading"
  >
    <ul
      class="caroisel-container"
      :style="{ marginTop }"
      @transitionend="handleTransitionend"
    >
      <li v-for="item in data" :key="item.id">
        <CarouselItem :carousel="item" />
      </li>
    </ul>
    <div class="icon icon-up" v-show="index > 0" @click="switchTo(index - 1)">
      <Icon type="arrowUp" />
    </div>
    <div
      class="icon icon-down"
      v-show="index < data.length - 1"
      @click="switchTo(index + 1)"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        v-for="(item, i) in data"
        :key="item.id"
        :class="{ active: i == index }"
        @click="switchTo(i)"
      ></li>
    </ul>
    <!-- <Loading v-if="isLoading" /> -->
  </div>
</template>

<script>
import { getBanners } from '@/api/banner';
import CarouselItem from './CarouselItem.vue';
import Icon from '@/components/Icon/index.vue';
// import Loading from '@/components/Loading/index.vue';
// import fetchData from '@/mixins/fetchData.js';  因为将这个数据放到了仓库中，所以这里也不用mixin了，仓库已经把这件事做了
import { mapState } from 'vuex';

export default {
  // 组件混入，将各个组件中的重复代码提取到公共组件
  // mixins: [fetchData([])],
  components: {
    CarouselItem,
    Icon,
    // Loading,
  },
  data() {
    return {
      index: 0, //表示当前显示第几页，通过这个数据来控制展示页面
      containerHeight: 0, //获得容器高度
      switching: false, //是否正在翻页
    };
  },
  created() {
    this.$store.dispatch('banner/fetchBanner');
  },
  mounted() {
    // 只有在挂载完了以后才能拿到这个宽高
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener('resize', this.handleResize);
  },
  // 消除组件时清除视口宽度监听事件
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + 'px';
    },
    ...mapState('banner', ['loading', 'data']),
  },
  methods: {
    switchTo(i) {
      this.index = i;
    },
    // 鼠标滚轮事件处理函数
    handleWheel(e) {
      // 如果正在翻页，则不进行
      if (this.switching) {
        return;
      }

      if (e.deltaY < -5 && this.index > 0) {
        this.switching = true;
        console.log('往上滚动');
        this.index--;
      }
      if (e.deltaY > 5 && this.index < this.data.length - 1) {
        this.switching = true;
        console.log('往下滚动');
        this.index++;
      }
    },
    // 滚轮结束监听处理事件
    handleTransitionend() {
      this.switching = false;
    },
    // 处理视口宽度改变的情况
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
    async fetchData() {
      return await getBanners();
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/mixin.less';
@import '~@/style/var.less';

.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  // 这里设置overflow是因为出现了margin合并bug，小圆点和上下箭头都跑到上面去了，这里触发bfc
  overflow: hidden;
  .caroisel-container {
    transition: 0.5s;
  }
  .icon {
    .self-center();
    font-size: 30px;
    color: @gray;
    cursor: pointer;
  }
  @gap: 20px;
  .icon-up {
    transform: translateX(-50%);
    top: @gap;
    animation: jump-up 2s infinite;
  }
  .icon-down {
    top: auto;
    bottom: @gap;
    animation: jump-down 2s infinite;
  }

  @jump: 5px;
  @keyframes jump-up {
    0% {
      transform: translate(-50%, @jump);
    }
    50% {
      transform: translate(-50%, -@jump);
    }
    100% {
      transform: translate(-50%, @jump);
    }
  }

  @keyframes jump-down {
    0% {
      transform: translate(-50%, -@jump);
    }
    50% {
      transform: translate(-50%, @jump);
    }
    100% {
      transform: translate(-50%, -@jump);
    }
  }

  .indicator {
    .self-center();
    transform: translateY(-50%);
    left: auto;
    list-style: none;
    right: 10px;
    li {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      border: 1px solid #fff;
      margin-bottom: 10px;
      box-sizing: border-box;
      cursor: pointer;
      background-color: @words;
    }
    .active {
      background-color: #fff;
    }
  }

  .caroisel-container {
    width: 100%;
    height: 100%;
    li {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

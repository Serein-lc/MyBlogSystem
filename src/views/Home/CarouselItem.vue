<template>
  <div
    class="carousel-item-container"
    ref="container"
    @mousemove="handleMousemove"
    @mouseleave="handleMouseleave"
  >
    <div class="carousel-img" ref="inner" :style="imagePosition">
      <ImgLoader
        @load="showWords"
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
      />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImgLoader from '@/components/ImgLoader/index.vue';
export default {
  data() {
    return {
      titleWidth: 0, //title文字宽度
      descWidth: 0, //desc文字宽度
      containerSize: null, //外层容器的尺寸
      innerSize: null, //图片容器的尺寸
      mouseX: 0,
      mouseY: 0,
    };
  },
  components: {
    ImgLoader,
  },
  props: ['carousel'],
  computed: {
    // 设置鼠标移动，图片也跟着移动，首先考虑极限情况，当鼠标移到最右边的时候，X轴上，鼠标距离container的left位置和多出来的宽度的比例是不变的，高度也是一样的
    // 设我们要求的图片的left值为X，就有 X/ mouseX = -extraWidth / containerSize.width ==> X = -extraWidth / containerSize.width * mouseX
    imagePosition() {
      if (!this.innerSize || !this.containerSize) {
        return {
          transform: `translate(${left}px,${top}px)`,
        };
      }
      const extraWidth = this.innerSize.width - this.containerSize.width; //多出的宽度
      const extraHeight = this.innerSize.height - this.containerSize.height; //多出的高度
      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraHeight / this.containerSize.height) * this.mouseY;

      return {
        transform: `translate(${left}px, ${top}px)`,
      };
    },
    // 计算中间坐标
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  // 读取文字的宽度
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    // 初始化 mouseX  mouseY  将图片设置到中间
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener('resize', this.setSize);
  },
  destroyed() {
    window.removeEventListener('resize', this.setSize);
  },
  methods: {
    //调用该方法显示文字
    showWords() {
      // title
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      this.$refs.title.style.transition = '2s';
      // 强制网页刷新
      this.$refs.title.clientWidth;
      // 设置宽度
      this.$refs.title.style.width = this.titleWidth + 'px';

      // desc
      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      this.$refs.desc.style.transition = '1.5s 1.5s';

      // 强制网页刷新
      this.$refs.desc.clientWidth;
      // 设置宽度
      this.$refs.desc.style.width = this.descWidth + 'px';
    },
    //当视口宽度改变之后，重新获取containerSize  innerSize
    setSize() {
      this.containerSize = {
        height: this.$refs.container.clientHeight,
        width: this.$refs.container.clientWidth,
      };

      this.innerSize = {
        height: this.$refs.inner.clientHeight,
        width: this.$refs.inner.clientWidth,
      };
    },
    // 获取鼠标相对container的位置
    handleMousemove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseleave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/var.less';
.carousel-item-container {
  width: 100%;
  height: 100%;
  // background-color: @dark;
  position: relative;
  overflow: hidden;
  color: #fff;
}
.carousel-img {
  width: 105%;
  height: 105%;
  position: absolute;
  transition: 0.3s;
}

.title,
.desc {
  position: absolute;
  letter-spacing: 3px;
  color: #fff;
  left: 50px;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
}
.title {
  top: calc(50% - 60px);
  font-size: 2em;
}
.desc {
  top: 50%;
  font-size: 1.3em;
  color: lighten(@gray, 20%);
}
</style>

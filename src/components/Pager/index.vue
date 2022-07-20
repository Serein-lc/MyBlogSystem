<!-- 分页组件，底部分页组件 -->
<template>
  <!-- 当总页数大于1的时候才显示整个组件 -->
  <div class="pager-container" v-if="pageNumber > 1">
    <!-- 判断首页第一个类样式就是判断当前页是否为第一页 -->
    <a @click="handlePage(1)" :class="{ disabled: current === 1 }">|&lt;&lt;</a>
    <a @click="handlePage(current - 1)" :class="{ disabled: current === 1 }"
      >&lt;&lt;</a
    >
    <!-- 在渲染页数的时候如果有一个数组，那我们可以直接通过v-for来循环数组，就可以渲染出数据 -->

    <a
      @click="handlePage(n)"
      v-for="(n, i) in numbers"
      :key="i"
      :class="{ active: n === current }"
      >{{ n }}</a
    >
    <!-- 尾页和下一页就是判断是否为最大页数，current等于总页数 -->
    <a
      @click="handlePage(current + 1)"
      :class="{ disabled: current === pageNumber }"
      >&gt;&gt;</a
    >
    <a
      @click="handlePage(pageNumber)"
      :class="{ disabled: current === pageNumber }"
      >&gt;&gt;|</a
    >
  </div>
</template>

<style lang="less" scoped>
@import '~@/style/var.less';
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0px;
  a {
    color: @primary;
    margin: 0px 10px;
    cursor: pointer;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
    }
  }
}
</style>

<script>
export default {
  props: {
    //当前页码
    current: {
      type: Number,
      default: 1,
    },
    //总数据量
    total: {
      type: Number,
      default: 120,
    },
    //页容量
    limit: {
      type: Number,
      default: 10,
    },
    //可见页码数
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    // 计算总共有多少页
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    // 得到页码中显示的最小的数字
    visibleMin() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    // 得到页码中显示的最大的数字
    visibleMax() {
      let max = this.visibleMin + this.visibleNumber - 1;
      if (max > this.pageNumber) {
        max = this.pageNumber;
      }
      return max;
    },
    numbers() {
      let newArr = [];
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        newArr.push(i);
      }
      return newArr;
    },
  },
  //子组件中不能直接更改父组件传递过来的数据，当遇到组件事件要更改父组件的数据的时候，子组件只能够抛出事件，并且传递参数，由父组件来进行操作数据更改
  //如果父组件还不能够处理数据，则必须再次抛出事件，直到能够处理该数据的父组件来处理，当然，父组件也可以选择不处理
  methods: {
    handlePage(newPage) {
      //限定点击的条件
      if (newPage < 1) {
        newPage = 1;
      }
      if (newPage > this.pageNumber) {
        newPage = this.pageNumber;
      }
      if (newPage === this.current) {
        return;
      }
      // 抛出一个事件，通过实例成员$emit来抛出一个事件，参数需要包括事件名，事件参数
      this.$emit('pageChange', newPage);
    },
  },
};
</script>

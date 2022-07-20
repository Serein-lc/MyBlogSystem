<!-- 无数据时的组件 -->

<template>
  <div class="empty-container">
    <Icon type="empty" />
    <p>{{ test }}</p>
  </div>
</template>

<script>
import Icon from '@/components/Icon';
export default {
  components: {
    Icon,
  },
  props: {
    test: {
      type: String,
      default: '无数据',
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/var.less';
@import '~@/style/mixin.less';
.empty-container {
  .self-center();
  .icon-container {
    color: @gray;
    font-size: 80px;
  }
  p {
    font-size: 14px;
    color: @gray;
    text-align: center;
  }
}
</style>

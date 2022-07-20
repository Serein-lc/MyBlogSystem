<!-- 加载组件，本项目没有使用这个组件，loading效果是制作成指令 -->
<template>
  <img src="@/assets/loading.svg" class="img-container" alt="" />
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import '~@/style/mixin.less';

.img-container {
  .self-center();
}
</style>

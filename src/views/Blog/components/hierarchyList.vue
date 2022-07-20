<!-- 文章右边列表（导航）组件 组件递归-->
<template>
  <ul class="hieraechyList-container">
    <li v-for="(item, i) in list" :key="i">
      <span @click="handleClick(item)" :class="{ active: item.isSelect }">
        {{ item.name }}
      </span>
      <span
        v-if="item.aside"
        class="aside"
        :class="{ active: item.isSelect }"
        @click="handleClick(item)"
      >
        {{ item.aside }}
      </span>
      <!-- 在自己的组件递归中使用了事件，照样是要抛出事件，虽然是自己本身组件，但是自己还是处理不了，需要父级元素来处理，所以还是要抛出事件 -->
      <hieraechyList :list="item.children" @select="handleClick" />
    </li>
  </ul>
</template>

<script>
export default {
  // 递归组件，给组件本身命名，然后就可以在自己本组件中递归渲染组件
  name: 'hieraechyList',
  props: {
    //[{ name:"xxx", isSelect:false children:[{name:"xxx", children:[{name"xxx",}]  }]  }]

    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      if (!item.isSelect) {
        this.$emit('select', item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/var.less';
.hieraechyList-container {
  list-style: none;
  .hieraechyList-container {
    margin-left: 1em;
  }
  li {
    min-height: 40px;
    line-height: 40px;
    cursor: pointer;
    font-size: 14px;
    .active {
      color: @warn;
      font-weight: bold;
    }
  }
}
.aside {
  margin-left: 1em;
  font-size: 12px;
  color: @gray;
}
</style>

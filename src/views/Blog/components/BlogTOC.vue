<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <hierarchyList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import hierarchyList from './hierarchyList';
import { debounce } from '@/utils';
export default {
  components: {
    hierarchyList,
  },
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      activeAnchor: '',
    };
  },
  computed: {
    //根据toc属性以及activeAnchor得到带有isSelect属性的数组
    tocWithSelect() {
      const getTOC = (toc = []) => {
        return toc.map((t) => ({
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children: getTOC(t.children),
        }));
      };
      return getTOC(this.toc);
    },
    //用来获取页面中的标题标签，根据toc获得一个对应元素的数组，
    doms() {
      const doms = [];
      const addToDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          // 判断是否有子元素
          if (t.children && t.children.length) {
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    },
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    //设置activeAnchor为正确的值
    setSelect(scrollDom) {
      if (!scrollDom) {
        return;
      }

      const range = 100; //规定标题离视口顶部多少距离算选中
      this.activeAnchor = ''; // 由于后续要重新设置，先清空之前的状态
      // 把每一个元素拿出来，看一下哪个是激活位置
      for (const dom of this.doms) {
        // 看一下当前这个dom元素时候不是被选中
        if (!dom) {
          continue;
        }
        // 得到dom元素距离视口顶端的距离
        const top = dom.getBoundingClientRect().top;

        // 一共有三种情况，1.dom在我们的规定范围内  2.在我们规定范围下面  3.在我们规定范围上面
        //  分别对应的是      一定选中                  一定不选中           在规定范围内有对应的dom元素，则在上面的dom元素不选中，没有则选中

        if (top >= 0 && top <= range) {
          // 则是第一种情况  dom元素在我们的规定范围内
          this.activeAnchor = dom.id;
        } else if (top > range) {
          // 则是第二种情况   dom元素在规定范围下面
          return;
        } else {
          // 则是第三种情况，dom元素在视口的上面（已经被遮住）
          this.activeAnchor = dom.id;
        }
      }
    },
  },
  created() {
    this.setSelectDebounce = debounce(this.setSelect, 50);
    this.$bus.$on('mainScroll', this.setSelectDebounce);
  },
  destroyed() {
    this.$bus.$off('mainScroll', this.setSelectDebounce);
  },
};
</script>

<style lang="less" scoped>
.blog-toc-container {
  h2 {
    font-size: 1em;
    font-weight: bold;
    letter-spacing: 2px;
    margin-bottom: 10px;
  }
}
</style>

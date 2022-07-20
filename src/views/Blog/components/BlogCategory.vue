<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <hierarchyList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import hierarchyList from './hierarchyList.vue';
import fetchData from '@/mixins/fetchData';
import { getBlogTypes } from '@/api/blog';

export default {
  mixins: [fetchData([])],
  components: {
    hierarchyList,
  },
  computed: {
    // 计算属性：分类Id
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    limit() {
      const limit = +this.$route.query.limit || 10;
    },
    // 根据计算属性categoryId以及fetchData得到的分类数据 得到列表数据
    list() {
      // 原始数据
      const summaryArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );
      const result = [
        { name: '全部', id: -1, articleCount: summaryArticleCount },
        ...this.data,
      ];
      return result.map((it) => ({
        ...it,
        isSelect: it.id === this.categoryId,
        aside: `${it.articleCount}篇`,
      }));
    },
  },
  methods: {
    async fetchData() {
      return await getBlogTypes();
    },
    handleSelect(item) {
      const query = {
        // 跳转到一个新的分类后，回到这个分类的第一页
        page: 1,
        limit: this.limit,
      };
      // 跳转到 当前的分类id
      if (item.id === -1) {
        // 当前没有分类
        // /article?page=${newPage}&limit=${this.routeInfo.limit}
        this.$router.push({
          name: 'Blog',
          query,
        });
      } else {
        this.$router.push({
          name: 'BlogCategoryId',
          query,
          params: {
            categoryId: item.id,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.blog-category-container {
  width: 300px;
  box-sizing: border-box;
  padding: 25px;
  position: relative;
  height: 100%;
  overflow-y: scroll;
  h2 {
    font-size: 1em;
    font-weight: bold;
    letter-spacing: 2px;
    margin: 0;
  }
}
</style>

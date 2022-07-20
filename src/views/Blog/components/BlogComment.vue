<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from '@/components/MessageArea/index.vue';
import fetchData from '@/mixins/fetchData';
import { getComments, postComment } from '@/api/blog';
export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  components: { MessageArea },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.$bus.$on('mainScroll', this.handleScroll);
  },
  destroyed() {
    this.$bus.$off('mainScroll', this.handleScroll);
  },
  computed: {
    // 判断是否还有更多得评论数据
    hasMore() {
      return this.data.rows.length <= this.data.total;
    },
  },
  methods: {
    async fetchData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    // 加载下一页
    async fetchMore() {
      if (!this.hasMore) {
        //已经加载得数据大于或者等于数据总数得时候，就不加载了，直接返回
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    // 处理滚动事件
    async handleScroll(dom) {
      if (this.isLoading || !dom) {
        // 目前正在加载
        return;
      }
      const range = 100; // 距离底部的固定距离，当滚动高度和视口高度与博客的整体高度的插值绝对值小于这个值，就进行加载
      const deff = Math.abs(
        dom.clientHeight + dom.scrollTop - dom.scrollHeight
      );
      if (deff < range) {
        // 到底部了
        this.fetchMore();
      }
    },
    async handleSubmit(formData, callback) {
      // 当有用户点击评论，父组件这里我们要做的就是使用AJAX将数据传到服务器且把评论添加到数组的第一项，然后评论数加一
      const resp = await postComment({
        // nickname: formData.nickname,
        // content: formData.content,
        ...formData,
        blogId: this.$route.params.id,
      });
      this.data.rows.unshift(resp);
      this.data.total++;
      callback('评论成功'); //告诉子组件，父组件处理完了，让子组件接着处理
    },
  },
};
</script>

<style lang="less" scoped>
.blog-comment-container {
  margin: 100px 0;
}
</style>

<!-- main区域留言板页面 -->
<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :isListLoading="isLoading"
      :list="data.rows"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from '@/components/MessageArea';
import fetchData from '@/mixins/fetchData';
import * as msgApi from '@/api/message';
import mainScroll from '@/mixins/mainScroll';
export default {
  mixins: [
    fetchData({
      total: 0,
      rows: [],
    }),
    mainScroll('messageContainer'),
  ],
  created() {
    this.$bus.$on('mainScroll', this.handleScroll);
  },
  destroyed() {
    this.$bus.$off('mainScroll', this.handleScroll);
  },
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  computed: {
    // 判断是否还有更多得评论数据
    hasMore() {
      return this.data.rows.length <= this.data.total;
    },
  },
  methods: {
    async fetchData() {
      return msgApi.getMessages(this.page, this.limit);
    },
    async handleSubmit(data, callback) {
      const resp = await msgApi.postMessage(data);
      callback('留言成功');
      this.data.rows.unshift(resp);
      this.data.total++;
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
  },
};
</script>

<style scoped>
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>

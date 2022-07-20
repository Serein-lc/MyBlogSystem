<template>
  <Layout>
    <div class="main-comtainer" v-loading="isLoading" ref="mainContainer">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout';
import fetchData from '@/mixins/fetchData';
import { getBlog } from '@/api/blog';
import BlogDetail from './components/BlogDetail.vue';
import BlogTOC from './components/BlogTOC.vue';
import BlogComment from './components/BlogComment';
import mainScroll from '@/mixins/mainScroll';
export default {
  mixins: [fetchData(null), mainScroll('mainContainer')],
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },

  methods: {
    async fetchData() {
      let resp = await getBlog();
      if (!resp) {
        //文章不存在
        this.$router.push('/404');
        return;
      }
      return resp;
    },
  },

  updated() {
    const hash = location.hash;
    location.hash = '';
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
};
</script>

<style lang="less" scoped>
.main-comtainer {
  overflow-y: scroll;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.right-container {
  height: 100%;
  width: 300px;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: scroll;
  position: relative;
}
</style>

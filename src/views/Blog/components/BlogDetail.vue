<template>
  <div class="blog-detail-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span class="span">日期：{{ formatDate(blog.createDate) }}</span>
      <span>浏览：{{ blog.scanNumber }}</span>
      <span>
        评论：<a href="#data-form-container">{{ blog.commentNumber }}</a>
      </span>
      <span>
        <router-link
          :to="{
            name: 'BlogCategoryId',
            params: {
              categoryId: blog.category.id,
            },
          }"
          >{{ blog.category.name }}</router-link
        >
      </span>
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
import { formatDate } from '@/utils';
import '@/style/markdown.css';
import 'highlight.js/styles/github.css';
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style lang="less" scoped>
@import '@/style/var.less';
.aside {
  font-size: 12px;
  margin: 20px 0;
  color: @gray;
  span {
    margin-left: 20px;
  }
  .span {
    margin-left: 0;
  }
}
</style>

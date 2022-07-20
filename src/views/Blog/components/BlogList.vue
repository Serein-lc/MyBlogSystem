<template>
  <div class="blog-list-container" ref="mainContainer" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <router-link
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </router-link>
        </div>
        <div class="main">
          <router-link
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </router-link>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <router-link
              :to="{
                name: 'BlogCategoryId',
                params: {
                  categoryId: item.category.id,
                },
              }"
              class=""
              >{{ item.category.name }}</router-link
            >
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>

    <!-- 页面无数据 -->
    <Empty v-if="data.rows.length === 0 && !isLoading" />

    <!-- 分页放到这里 -->
    <Pager
      v-if="data.total"
      :current="this.routeInfo.page"
      :limit="this.routeInfo.limit"
      :total="data.total"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import Pager from '@/components/Pager';
import fetchData from '@/mixins/fetchData';
import { getBlogs } from '@/api/blog';
import { formatDate } from '@/utils';
import mainScroll from '@/mixins/mainScroll';
import Empty from '@/components/Empty';
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll('mainContainer')],
  components: {
    Pager,
    Empty,
  },
  computed: {
    //通过地址栏获取路由信息
    routeInfo() {
      // 获取到分页id，如果没有传递就默认-1，代表显示所有分类 +是隐式转换为数字
      const categoryId = +this.$route.params.categoryId || -1;
      //获取当前所在页，如果没有传递就默认第一页
      const page = +this.$route.query.page || 1;
      // 获取页容量，如果没有传递默认十条
      const limit = +this.$route.query.limit || 10;
      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  methods: {
    formatDate,
    async fetchData() {
      return await getBlogs(
        this.routeInfo.categoryId,
        this.routeInfo.limit,
        this.routeInfo.page
      );
    },
    handlePageChange(newPage) {
      //点击以后需要跳转到  当前的分类Id，当前的页容量   newPage的页码  所以就有以下两种情况 1.没有分类  2.有分类
      // 1.没有分类： /blog?page=${newPage}&limit=${this.routeInfo.limit}
      // 2.有分类： /blog/cate/${this.routeInfo.categoryId}?page=${newPage}&limit=${this.routeInfo.limit}   所以要进行判断

      const query = {
        // 两种情况的query（参数）是一样的
        page: newPage,
        limit: this.routeInfo.limit,
      };
      if (this.routeInfo.categoryId === -1) {
        //没有分类
        this.$router.push({
          // 命名路由跳转
          name: 'Blog',
          query,
        });
      } else {
        // 有分类
        this.$router.push({
          // 命名路由跳转
          name: 'BlogCategoryId',
          query,
          // 因为分类是动态的，所以这里使用了动态路由导航
          params: {
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
  },
  watch: {
    //监听$route的变化，更新页面的数据
    async $route() {
      this.isLoading = true;
      // 跳转到页面的最上方，
      this.$refs.mainContainer.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>
<style scoped lang="less">
@import '~@/style/var.less';
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>

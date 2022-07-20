<!-- 左边导航栏区域组件 -->
<template>
  <div class="left">
    <template v-if="data">
      <Avatar :url="data && data.avatar" class="Avatar" />
      <h1 class="title">{{ data.siteTitle }}</h1>
    </template>
    <Menu />
    <Contact v-if="data" />
  </div>
</template>

<script>
import Avatar from '@/components/Avatar';
import Menu from '@/components/SiteAside/Menu';
import Contact from '@/components/SiteAside/Contact';
import { mapState } from 'vuex';

export default {
  components: {
    Avatar,
    Menu,
    Contact,
  },
  computed: mapState('setting', ['data']),
};
</script>

<style lang="less" scoped>
.left {
  width: 100%;
  height: 100%;
  background-color: #202020;
  padding: 20px 0;
  box-sizing: border-box;
  display: inline-block;
  overflow-y: scroll;
  .title {
    font-size: 1.2em;
    text-align: center;
    color: #fff;
    margin: 18px 0;
  }
  .avatar-container {
    margin: 0 auto;
  }
  .menu-container {
    margin: 50px 0;
  }
  .contact-container {
    margin: 24px;
  }
}
</style>

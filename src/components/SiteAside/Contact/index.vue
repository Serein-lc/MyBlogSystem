<template>
  <div class="contact-container">
    <div>
      <Icon type="github" class="icon" />
      <a target="_blank" :href="data.github">{{ data.githubName }}</a>
    </div>
    <div>
      <Icon type="mail" />
      <a :href="`mailto:${data.mail}`">{{ data.mail }}</a>
    </div>
    <div class="nav-qq">
      <Icon type="qq" />
      <a
        :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
        >{{ data.qq }}</a
      >
      <div class="nav">
        <img :src="data.qqQrCode" alt="" />
      </div>
    </div>
    <div class="nav-qq">
      <Icon type="weixin" />
      <a>{{ data.weixin }}</a>
      <div class="nav">
        <img :src="data.weixinQrCode" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon';
import { mapState } from 'vuex';
export default {
  components: {
    Icon,
  },
  computed: mapState('setting', ['data']),
};
</script>

<style lang="less" scoped>
@import '~@/style/var.less';

.contact-container {
  div {
    width: 100%;
    height: 40px;
    // background-color: @dark;
    color: @gray;
    padding-left: 5px;
    box-sizing: border-box;
    font-size: 20px;
    position: relative;

    &:hover {
      color: @primary;
    }
    a {
      padding-left: 10px;
      cursor: pointer;
      margin-bottom: 4px;
      font-size: 14px;
    }
    .nav {
      position: absolute;
      width: 150px;
      height: 150px;
      background-color: #fff;
      padding: 20px;
      bottom: 40px;
      border-radius: 5px;
      transform: scaleY(0);
      transform-origin: center bottom;
      transition: 0.3s;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        width: 8px;
        height: 8px;
        transform: translateX(-50%) rotate(45deg);
        background: #fff;
        bottom: -4px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .nav-qq:hover {
    .nav {
      transform: scaleY(1);
    }
  }
}
</style>

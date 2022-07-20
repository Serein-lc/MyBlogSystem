<template>
  <!--active-class="active" 更改匹配类名
        exact-active-class="" 更改精确匹配的类名 -->
  <div class="menu-container">
    <router-link
      :to="{ name: item.name }"
      class="menu"
      v-for="item in items"
      :key="item.link"
      :exact="item.exact"
      active-class="active"
      exact-active-class=""
    >
      <Icon :type="item.icon" />
      <span>{{ item.title }}</span>
    </router-link>
  </div>
</template>

<script>
import Icon from '@/components/Icon';
export default {
  components: { Icon },
  data() {
    return {
      items: [
        {
          name: 'Home',
          title: '首页',
          icon: 'home',
          exact: true, //必须精准匹配（路由激活状态）
        },
        {
          name: 'Blog',
          title: '文章',
          icon: 'blog',
          exact: false, //不用精准匹配
        },
        {
          name: 'About',
          title: '关于我',
          icon: 'about',
          exact: true, //必须精准匹配（路由激活状态）
        },
        {
          name: 'Project',
          title: '项目&效果',
          icon: 'code',
          exact: true, //必须精准匹配（路由激活状态）
        },
        {
          name: 'Message',
          title: '留言板',
          icon: 'chat',
          exact: true, //必须精准匹配（路由激活状态）
        },
      ],
    };
  },
  // 当使用了vue-router中的全局router-link组件之后我们就不需要这个方法了，
  // methods:{
  //     //通过判断元素的地址和当前地址是不是同一个或者是不是以元素地址开头，
  //     isActive(item){
  //         var link = item.link.toLowerCase(); //菜单元素的地址
  //         var curPathName = location.pathname.toLowerCase();//浏览器当前地址
  //         if(item.startWith){
  //             //当有startWith这个属性的时候就不再是判断是否地址相等，而是判断是否以这个link开头，这里返回的也是一个布尔值，这样就能有效的控制我们的class
  //             return curPathName.startsWith(link)
  //         }else{
  //             //反之就是判断是否相等，说明用户没有点击到当前菜单的二级目录里面去
  //             return curPathName === link;
  //         }
  //     }
  // }
};
</script>

<style lang="less" scped>
@import '~@/style/var.less';
.menu-container {
  color: @gray;
  .menu {
    &.active {
      background-color: #2d2d2d;
    }
    height: 45px;
    width: 100%;
    padding-left: 50px;
    box-sizing: border-box;
    line-height: 45px;
    cursor: pointer;
    span {
      padding-left: 8px;
    }
    .icon {
      width: 24px;
    }
  }
  a {
    display: block;
    &:hover {
      color: #fff;
    }
  }
}
</style>

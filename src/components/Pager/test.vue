

<template>
<div>
    1111
    <Pager :total="total" :current= "current" @pageChange="changePage($event)" />
</div>
    
</template>  


<script>
// 头像组件
    // import Avatar from "./components/Avatar.vue";
// 图标组件
    // import Icon from "@/components/Icon.vue"

//分页组件
import Pager from "./index.vue"
    export default {
        components:{
            Pager,
        },
        data(){
            return {
                total:302,
                current:1,
            }
        },
        methods:{
            changePage(newPage){
                this.current = newPage;
                console.log("加载当前页数据");
            }
        }

    }
</script>

<style scoped>
/* 我们可以通过在这里的style设置scoped来控制使用的字模板中的根节点的类名从而控制样式 */

</style>








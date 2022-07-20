<!-- 头像组件 -->
<template>
   <img class="avatar-container" 
    :src="url"
    :style="{
        height:size + 'px',
        width:size + 'px'
    }" />
</template>

<script>
    export default {
        props:{
            url:{
                type:String, //传递的参数类型
                required:true, //是否必须传递
            },
            size:{
                type:Number,
                default:150  //默认属性
            }
        }
    }
</script>

<style scoped>

.avatar-container {
    border-radius: 50%;
    object-fit: cover;
    display: block;
}

</style>
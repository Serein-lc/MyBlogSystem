<template>
    <div class="test-container">
        <ImageLoader 
	        src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
            placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
            :duration="3000"
        />
    </div>
</template>

<script>
import ImageLoader from "./components/ImgLoader"
export default {
    components:{
        ImageLoader,
    },
    methods:{
        load(){
            console.log("ImgLoader组件的事情都做完了，图片也加载好了")
        }
    }
}
</script>

<style scoped>
    .test-container{
        width: 500px;
        height: 400px;
        margin: 0 auto;
        border: 1px solid;
    }
</style>
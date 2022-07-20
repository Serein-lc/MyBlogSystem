<template>
    <div class="test-container">
        <Menu />
    </div>
</template>

<script>
import Menu from './components/Menu';
export default {
    components:{
    Menu
}
}
</script>

<style scoped>
.test-container{
    height: 600px;
    width: 400px;
    margin: 0 auto;
    background-color: #000;
}
</style>
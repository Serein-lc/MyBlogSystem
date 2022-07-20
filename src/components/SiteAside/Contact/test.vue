<template>
    <div class="test-container">
        <Contact />
    </div>
</template>

<script>
import Contact from './';
export default {
    components:{
    Contact
}
}
</script>

<style scoped>
.test-container{
    height: 600px;
    width: 400px;
    margin: 0 auto;
    background-color: bisque;
}
</style>
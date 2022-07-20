<template>
    <div class="test-container">
        <Empty />
    </div>
</template>

<script>
import Empty from "./components/Empty"
export default {
    components:{
        Empty
    }
}
</script>

<style>

.test-container{
    width: 600px;
    height: 700px;
    position:relative;
}
</style>
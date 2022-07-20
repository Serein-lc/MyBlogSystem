export default function(refValue) {
    return {
        mounted() {
            this.$bus.$on('setMainScroll', this.handlerSetMainScroll);
            this.$refs[refValue].addEventListener('scroll', this.handlerMainScroll);
        },
        beforeDestroy() {
            this.$bus.$emit('mainScroll');
            this.$refs[refValue].removeEventListener('scroll', this.handlerMainScroll);
        },
        methods: {
            handlerSetMainScroll(scrollTop) {
                this.$refs[refValue].scrollTop = scrollTop;
            },
            handlerMainScroll() {
                // 滚动条已经监听了，就可以往事件总线里面触发事件了
                this.$bus.$emit('mainScroll', this.$refs[refValue]);
            },
        }
    }
}
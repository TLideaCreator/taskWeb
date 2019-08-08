<template>
    <DevelopWidget></DevelopWidget>
</template>

<script>
    import DevelopWidget from "../../components/DevelopWidget/DevelopWidget";
    export default {
        components: {DevelopWidget},
        props: {
            projectId: {
                type: String,
                default: ''
            }
        },
    }
</script>

<style scoped lang="less">
    @import "~@/assets/style/constants.less";
    @import "~@/assets/style/common.less";
</style>

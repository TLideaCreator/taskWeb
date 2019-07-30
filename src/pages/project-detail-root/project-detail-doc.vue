<template>
    <v-layout column fill-height class="contentLayout"></v-layout>
</template>

<script>
    export default {
        name: "project-detail-block.vue",
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

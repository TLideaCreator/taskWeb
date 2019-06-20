<template>
    <Layout :style="fullHeight">
        <HeaderLine
            title="任务详情"
        ></HeaderLine>
        <Content>
            <develop-widget></develop-widget>
        </Content>
    </Layout>
</template>

<script>
    import {consts} from '@/utils'
    import DevelopWidget from "@/components/DevelopWidget/DevelopWidget";
    export default {
        name: "project-doc-page",
        components: {DevelopWidget},
        computed: {
            fullHeight(){
                return consts.contentHeight;
            }
        }
    }
</script>

<style scoped>

</style>

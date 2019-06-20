<template>
    <Layout :style="fullHeight">
        <HeaderLine
            title="项目报告"
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
        name: "project-stats-page",
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

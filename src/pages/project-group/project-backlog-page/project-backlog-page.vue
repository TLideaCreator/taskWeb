<template>
    <Layout :style="fullHeight">
        <HeaderLine
                title="发布计划"
        ></HeaderLine>
        <Content>
            <DevelopWidget></DevelopWidget>
        </Content>
    </Layout>
</template>

<script>
    import {consts} from '@/utils'
    import DevelopWidget from "@/components/DevelopWidget/DevelopWidget";
    export default {
        name: "project-backlog-page",
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

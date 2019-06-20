<template>
    <Layout :style="fullHeight">
        <HeaderLine
            title="任务类型"
        ></HeaderLine>
        <Content>
            <DevelopWidget></DevelopWidget>
        </Content>
    </Layout>
</template>

<script>
    import {consts} from '@/utils';
    import DevelopWidget from "@/components/DevelopWidget/DevelopWidget";
    export default {
        name: "project-setting-status-page",
        components: {DevelopWidget},
        computed:{
            fullHeight(){
                return consts.contentHeight;
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <Layout :style="fullHeight">
        <HeaderLine
            title="任务优先级"
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
        name: "project-setting-type-page",
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
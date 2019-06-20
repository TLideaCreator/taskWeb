<template>
    <Layout style="height: 100%;background: transparent">
        <Row type="flex" justify="center" align="middle" style="height: 100%">
            <CreateProjectStep1
                    ref="step1"
                    v-show="stepIndex === 'inputProjectName'"
                    @create-success="nextStep"
            ></CreateProjectStep1>
            <CreateProjectStep2
                    ref="step2"
                    v-show="stepIndex === 'selectMember'"
                    :pid="projectInfo.id"
                    @finish="cancelEvent"
            ></CreateProjectStep2>
        </Row>
        <Button style="position: fixed; top:30px;left:30px" shape="circle" icon="md-close"  size="large" @click="cancelEvent"></Button>
    </Layout>

</template>

<script>
    import CreateProjectStep1 from "./create-project-step1";
    import CreateProjectStep2 from "./create-project-step2";
    export default {
        name: "project-create-page",
        components: {CreateProjectStep1, CreateProjectStep2},
        data(){
            return {
                stepIndex: 'inputProjectName',
                projectInfo: {}
            }
        },
        methods: {
            nextStep(projectInfo) {
                this.stepIndex = 'selectMember';
                this.projectInfo = projectInfo;
            },
            cancelEvent(){
                this.$refs.step1.resetVar();
                this.$refs.step2.resetVar();
                this.stepIndex = 'inputProjectName';
                this.$emit('closeModal',this.projectInfo.id);
            }
        }
    }
</script>

<style scoped>

</style>

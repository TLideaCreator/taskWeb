<template>
    <Layout :style="fullHeight">
        <HeaderLine
                title="项目设置"
        ></HeaderLine>
        <Content ref="content">
            <Scroll
                    :height="scrollHeight"
            >
                <Row justify="center" type="flex">
                    <Col :span="8">
                        <Form label-position="top">
                            <FormItem label="项目名称">
                                <Input
                                        v-model="projectInfo.name"
                                    :disabled="isMgr"
                                ></Input>
                            </FormItem>
                            <FormItem label="项目描述">
                                <Input v-model="projectInfo.desc"
                                       type="textarea"
                                       :autosize="{minRows:4, maxRows:6}"
                                    :disabled="isMgr"
                                ></Input>
                            </FormItem>
                            <FormItem>
                                <Button
                                        v-show="projectInfo"
                                        type="primary"
                                        @click="save"
                                >保存</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Scroll>
        </Content>
    </Layout>
</template>

<script>
    import {consts, router} from '@/utils'
    import api from '@/api'

    export default {
        name: "project-detail-page",
        data() {
            return {
                scrollHeight: 0,
                projectInfo: {},
                projectId: '',
                isMgr: false,
            }
        },
        computed: {
            fullHeight() {
                return consts.contentHeight;
            }
        },
        mounted() {
            this.scrollHeight = this.$refs.content.$el.clientHeight - 40;
        },
        beforeCreate() {
            this.projectId = router.currentRoute.params.id;
            api.project.getProjectDetailApi(this.projectId,result=>{
                this.projectInfo = result;
                this.isMgr=this.projectInfo.mgr.data.id !== consts.userInfo.id;
            })
        },
        methods: {
            save(){
                api.project.updateProject(this.projectInfo, (result)=>{
                    this.projectInfo = result;
                });
            }
        }
    }
</script>

<style scoped>

</style>

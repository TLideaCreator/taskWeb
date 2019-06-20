<template>
    <Layout :style="fullHeight">
        <HeaderLine
                title="任务库"
                btnTitle="创建冲刺"
                @headerBtnClick="createSprint"
        ></HeaderLine>
        <Layout class="contentLayout">
            <Row type="flex" justify="space-between" align="middle" style="margin-top: 20px" :gutter="20">
                <Col :span="4">
                    <Input v-model="searchKey">
                        <Icon type="ios-search" slot="suffix"></Icon>
                    </Input>
                </Col>
                <Col :span="16">
                    <NameFilterLine
                            :members="Object.values(memberList)"
                            @updateChecked="updateMemberChecked"
                    >
                    </NameFilterLine>
                </Col>
                <Col :span="4"></Col>
            </Row>

            <Content ref="contentDiv" style="margin-top: 20px;">
                <Row type="flex" justify="start" align="middle">
                    <Col :span=" showDetail? 18:24">
                        <Scroll :height="scrollerHeight">
                            <SprintLine
                                    v-for="sprint in sprintList"
                                    :key="sprint.id"
                                    :sprintItem="sprint"
                                    :selectTaskId="currentTask.id"
                                    :sprintTasks="taskList(sprint.id)"
                                    :statusList="statusList"
                                    :taskTypeList="taskTypeList"
                                    :taskPriorityList="taskPriorityList"
                                    @taskClick="showTaskDetail($event,sprint)"
                                    @dropItem="updateTaskSprint"
                                    @startSprintClick="startSprint"
                                    @createNewIssue="updateTaskChanged"
                            >
                            </SprintLine>

                        </Scroll>
                    </Col>
                    <Col v-show="showDetail" :span="showDetail? 6: 0" style="border-left: 1px solid #6d6d6d">
                        <Scroll :height="scrollerHeight">
                            <TaskDetailBlock
                                    v-model="showDetail"
                                    :taskId="currentTask.id"
                                    :disabledChangeStatus="currentTaskInSprint.name+'' === '0'"
                                    @updateTask="updateTaskChanged"
                            ></TaskDetailBlock>
                        </Scroll>
                    </Col>
                </Row>

            </Content>
        </Layout>
    </Layout>
</template>

<script>
    import {consts} from '@/utils'
    import store from './store/store'
    import NameFilterLine from "@/components/NameFilterLine";
    import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
    import TaskDetailBlock from "@/components/TaskDetailBlock";
    import SprintLine from "./components/sprint-line";

    export default {
        name: "project-task-page",
        components: {SprintLine, TaskDetailBlock, NameFilterLine},
        store,
        data() {
            return {
                scrollerHeight: 0,
                showDetail: false,
                currentTask: {},
                currentTaskInSprint: {}
            }
        },
        mounted() {
            this.scrollerHeight = this.$refs.contentDiv.$el.clientHeight - 40;
            store.dispatch('loadProjectSprints');
        },
        watch:{
            showDetail(val){
                if(!val){
                    this.currentTask = {};
                }
            }
        },

        computed: {
            fullHeight() {
                return consts.contentHeight;
            },
            searchKey: {
                get() {
                    return store.state.searchKey
                },
                set(val) {
                    store.commit('updateSearchKey', val);
                }
            },
            createTitle: {
                get() {
                    return store.state.createTitle
                },
                set(val) {
                    store.commit('updateCreateTitle', val);
                }
            },
            inCreate: {
                set(val) {
                    store.commit('updateInCreate', val);
                },
                get() {
                    return store.state.inCreate
                }
            },
            ...mapState([
                'memberList',
                'createLoading',
            ]),
            ...mapGetters({
                taskList: 'getTaskList',
                sprintList: 'getSprintList',
                statusList: 'getStatusList',
                taskTypeList: 'getTaskTypeList',
                taskPriorityList: 'getTaskPriorityList',
            })
        },
        methods: {
            showTaskDetail(task, sprint) {
                this.currentTask = task;
                this.currentTaskInSprint = sprint;
                this.showDetail = true;
            },
            ...mapMutations([
                'updateMemberChecked',
                'updateTaskChanged',
            ]),
            ...mapActions([
                'createSprint',
                'startSprint',
                'updateTaskSprint',
            ])
        }
    }
</script>

<style scoped lang="less" src="./assets/style/css.less">

</style>

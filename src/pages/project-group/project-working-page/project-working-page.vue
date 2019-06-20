<template>
    <Layout :style="fullHeight" onselectstart="return false">
        <HeaderLine
                :title="sprintItem.name|sprintName(sprintItem.projectName)"
                :btnTitle="btnTitle"
                @headerBtnClick="finishSprint"
        ></HeaderLine>
        <Modal v-model="showDetail" footer-hide :closable="false">
            <task-detail-block
                    v-model="showDetail"
                    :taskId="showTaskId"
                    @updateTask="updateTaskChanged"
            ></task-detail-block>
        </Modal>
        <Layout class="contentLayout">
            <Row type="flex" justify="space-between" align="middle" style="margin-top: 20px" :gutter="20">
                <Col :span="6">
                    <Input v-model="searchKey">
                        <Icon type="ios-search" slot="suffix"></Icon>
                    </Input>
                </Col>
                <Col :span="14">
                    <NameFilterLine
                            :members="Object.values(memberList)"
                            @updateChecked="updateMemberChecked"
                    ></NameFilterLine>
                </Col>
                <Col :span="4"></Col>
            </Row>
            <div class="statusLine">
                <h4 v-for="(stats) in taskStateList" :key="stats.name">{{stats.name}}</h4>
            </div>
            <Content ref="contentDiv">
                <div class="taskContentDiv" v-if="taskList.length > 0">
                    <Scroll style="width: 100%" :height="colMaxHeight">
                        <Row type="flex" justify="space-between" align="top">
                            <Col :span="24/taskStateList.length"
                                 v-for="(stats, index) in taskStateList"
                                 :key="index"
                            >
                                <drop
                                        tag="div"
                                        class="statsClass"
                                        @drop="drop({ $event , stats})"
                                >
                                    <div class="taskColDiv" :style="blockHeight">
                                        <div class="fakeClass"
                                             v-show="inDrag && index!==currentIndex"
                                             :style="getBlockStyle(stats)"
                                        ></div>
                                        <drag
                                                v-show="!inDrag || index === currentIndex"
                                                tag="div"
                                                v-for="task in getTaskStateList(stats)"
                                                :key="task.id"
                                                :transfer-data="{task,index}"
                                                @dragstart="startDrag"
                                        >
                                            <TaskCard
                                                    :task="task"
                                                    :prioritiesList="priorityList"
                                                    :typesList="typesList"
                                                    :statusList="taskStateList"
                                                    @click.native="showTaskDetail(task)"
                                            ></TaskCard>
                                        </drag>
                                    </div>
                                </drop>
                            </Col>
                        </Row>
                    </Scroll>
                </div>
                <Row style="height: 100%" v-else type="flex" justify="center" align="middle">
                    <Col>
                        <img :src="require('./assets/images/blank-img.png')"/>
                        <h3 style="text-align: center; margin-top: 25px">还没有任务</h3>
                        <h3 style="text-align: center; margin-top: 5px">请到
                            <router-link :to="{name:'project-tasks'}">任务库</router-link>
                            添加任务
                        </h3>
                    </Col>
                </Row>
            </Content>
        </Layout>
    </Layout>
</template>

<script>
    import {consts} from '@/utils'
    import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
    import TaskCard from "./components/task-card"
    import store from './store/store';
    import {Drag, Drop} from 'vue-drag-drop';
    import NameFilterLine from "@/components/NameFilterLine";
    import TaskDetailBlock from "@/components/TaskDetailBlock";

    export default {
        name: "project-working-page",
        store,
        components: {TaskDetailBlock, NameFilterLine, TaskCard, Drag, Drop},
        beforeCreate() {
            store.dispatch('loadTaskListInSprint');
        },
        data() {
            return {
                inDrag: false,
                currentIndex: 0,
                colHeight: 0,
                colMaxHeight: 0,
                showDetail: false,
                showTaskId: '',
            }
        },

        computed: {
            btnTitle() {
                return this.sprintItem.id ? '完成冲刺' : ''
            },
            searchKey: {
                get() {
                    return store.state.searchKey
                },
                set(val) {
                    store.commit('updateSearchKey', val);
                }
            },
            fullHeight() {
                return consts.contentHeight;
            },
            blockHeight() {
                return {minHeight: this.curColMaxHeight + 'px'};
            },

            ...mapState([
                'taskList',
                'sprintItem'
            ]),
            ...mapGetters({
                typesList: 'getTaskTypeList',
                taskStateList: 'getStatusList',
                priorityList: 'getTaskPriorityList',
                memberList: 'getMemberInTasks',
                curColMaxHeight: 'getCurColMaxHeight'
            })
        },
        mounted() {
            this.colMaxHeight = this.$refs.contentDiv.$el.clientHeight - 40;
        },
        watch: {
            '$route.path': function () {
                store.commit('cleanCache');
                store.dispatch('loadTaskListInSprint');
            }
        },
        methods: {
            showTaskDetail(task) {
                this.showTaskId = task.taskId;
                this.showDetail = true;
            },
            getTaskStateList(key) {
                return store.getters.getTaskListByStatus(key);
            },
            startDrag({index}) {
                this.currentIndex = index;
                this.inDrag = true;
            },

            getBlockStyle(stats) {
                let height = this.curColMaxHeight > this.colMaxHeight ? this.colMaxHeight : this.curColMaxHeight;
                return {
                    height: height + 'px',
                    border: '1px dashed ' + stats.color + '',
                    background: 'rgba(' +stats.color  + ',0.2)'
                }
            },
            drop(data) {
                this.inDrag = false;
                store.dispatch('updateTaskStatus', data);
            },
            ...mapActions([
                'finishSprint'
            ]),
            ...mapMutations([
                'updateMemberChecked',
                'updateTaskChanged'
            ])
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>

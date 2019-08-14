<template>
    <v-container fluid>
        <v-layout justify-space-between align-center>
            <v-flex md3>
                <v-text-field
                        v-model="searchKey"
                        placeholder="任务标题/任务描述"
                        prepend-inner-icon="search"
                >
                </v-text-field>
            </v-flex>

            <name-filter-line
                :members="members"
                @updateChecked="updateSelectedMembersList"
            ></name-filter-line>
        </v-layout>
        <div :style="fullHeight" style="overflow-y: auto; display: flex">
            <StatusTasks
                v-for="(status ,index) in statusList"
                :key="status.id"
                :statusItem="status"
                :statusIndex="index"
                :dragPosition="dragPosition"
                :taskList="taskList(status.id)"
                @taskItemClick="showTaskDetail"
                @taskInDrag="updateDragPosition"
                @updateTaskStatus="updateTaskStatus"
            >

            </StatusTasks>
        </div>
        <v-btn
                absolute
                top
                right
                color="info"
                v-show="sprint.id"
                @click="finishAlert"
        >
            完成冲刺
        </v-btn>
        <v-dialog v-model="showTaskDetailFlag"
                  width="800"
                  persistent

        >
            <TaskDetail
                    :task-id="currentTask.id"
                    @cancel="showTaskDetailFlag=false"
                    @taskUpdata="updateTaskStatus"
            ></TaskDetail>
        </v-dialog>
    </v-container>
</template>

<script>
    import api from '@/api';
    import {modal} from '@/utils';
    import {mapGetters,mapActions,mapMutations} from 'vuex';
    import NameFilterLine from "../../components/NameFilterLine";
    import StatusTasks from "./components/StatusTasks";
    import TaskDetail from "./components/TaskDetail";

    export default {
        components: {TaskDetail, StatusTasks, NameFilterLine},
        props: {
            projectId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                dragPosition: -1,
                showTaskDetailFlag: false,
                currentTask: {}
            };
        },
        mounted() {
            this.getProjectActiveSprint(this.projectId);
        },

        computed: {
            ...mapGetters({
                'loadAvatarImg': 'avatarUrl',
                'statusList': 'getStatusList',
                'typeList': 'getTypeList',
                'sprint': 'getSprintItem',
                'taskList': 'getStatusTaskList',
                'members': 'getMembersList',
                'prioritiesList': 'getPrioritiesList',
            }),

            searchKey:{
                get(){
                    return this.$store.state.sprint.searchKey;
                },
                set(val){
                    this.$store.commit('updateSearchKey',val)
                }
            },
            blockHeight() {
                let height = this.$store.state.contentFullHeight;
                return {
                    height: (height - 150) + 'px'
                }
            },
            fullHeight() {
                let height = this.$store.state.contentFullHeight;
                return {
                    height: (height- 88)+'px'
                }
            }
        },
        methods: {
            showTaskDetail(task){
                this.showTaskDetailFlag = true;
                this.currentTask = task;
            },
            updateDragPosition(position){
                this.dragPosition = position
            },
            finishAlert() {
                modal.confirm({
                    title: '提示',
                    content: '点击完成按钮后将结束本次冲刺，如果冲刺中有未完成的任务，将被重置为初始状态',
                    ok: {
                        text: '完成',
                    },
                    callback: () => {
                        api.sprint.sprintFinish(this.sprint.id, () => {
                            this.sprint = {}
                        })
                    }
                });
            },
            ...mapMutations([
                'updateSelectedMembersList'
            ]),
            ...mapActions([
                'getProjectActiveSprint',
                'updateTaskStatus'
            ])
        }
    }
</script>

<style scoped lang="less">
    @import "~@/assets/style/constants.less";
    @import "~@/assets/style/common.less";
</style>

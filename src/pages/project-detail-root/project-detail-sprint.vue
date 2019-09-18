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
    </v-container>
</template>

<script>
    import {modal, router} from '@/utils';
    import {mapGetters,mapActions,mapMutations} from 'vuex';
    import NameFilterLine from "../../components/NameFilterLine";
    import StatusTasks from "./components/StatusTasks";

    export default {
        components: {StatusTasks, NameFilterLine},
        props: {
            projectId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                dragPosition: -1,
            };
        },
        mounted() {
            this.getProjectActiveSprint(this.projectId);
        },

        computed: {
            ...mapGetters({
                'loadAvatarImg': 'avatarUrl',
                'statusList': 'sprint/getStatusList',
                'typeList': 'sprint/getTypeList',
                'sprint': 'sprint/getSprintItem',
                'taskList': 'sprint/getStatusTaskList',
                'members': 'sprint/getMembersList',
                'prioritiesList': 'sprint/getPrioritiesList',
            }),

            searchKey:{
                get(){
                    return this.$store.state.sprint.searchKey;
                },
                set(val){
                    this.$store.commit('sprint/updateSearchKey',val)
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
                router.replace({
                    'name': 'projectDetailTaskDetailPage',
                    params: {
                        projectId: this.projectId,
                        taskId: task.id
                    }
                });
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
                        this.sprintFinish(()=>{
                            modal.dismiss();
                        })
                    }
                });
            },
            ...mapMutations({
                'updateSelectedMembersList': 'sprint/updateSelectedMembersList'
            }),
            ...mapActions({
                'getProjectActiveSprint': 'sprint/getProjectActiveSprint',
                'sprintFinish': 'sprint/sprintFinish',
                'updateTaskStatus': 'sprint/updateTaskStatus'
            })
        }
    }
</script>

<style scoped lang="less">
    @import "~@/assets/style/constants.less";
    @import "~@/assets/style/common.less";
</style>

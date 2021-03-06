<template>
    <v-container fluid>
        <v-layout wrap height="64" justify-space-between align-center>
            <v-flex xs12 md4>
                <v-text-field
                        v-model="searchKey"
                        prepend-icon="search"
                        placeholder="输入任务标题或任务描述"
                ></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <NameFilterLine
                    :members="members"
                    @updateChecked="updateSelectedMembers"
            ></NameFilterLine>
        </v-layout>
        <v-divider></v-divider>

        <SprintItem
                v-for="(sprint,index) in sprints"
                :key="sprint.id"
                :project="$parent.projectInfo"
                :tasks="sprintTasks(sprint.id)"
                :taskTypes="taskTypes"
                :taskPriorities="taskPriorities"
                :sprintItem="sprint"
                :active="activeSprint"
                :class="{'inSprintAction':activeSprint && index === 0}"
                @startSprint="startSprint"
                @taskActions="updateTaskChanged"
                @clickItem="showTaskDetail"
        >
        </SprintItem>
        <v-btn
                absolute
                dark
                right
                top
                color="success"
                @click="createNewSprint"
        >
            <v-icon>
                add
            </v-icon>
            创建新冲刺
        </v-btn>
        <v-dialog
                persistent
                v-model="showTaskDetailFlag"
                width="800"
                height="75%"
        >
            <TaskDetail
                    :taskId="currentTask.id"
                    :project="$parent.projectInfo"
                    @cancel="showTaskDetailFlag= false"
                    @taskUpdate="updateTaskChanged"
            ></TaskDetail>

        </v-dialog>
    </v-container>
</template>

<script>
    import api from '@/api';
    import NameFilterLine from '@/components/NameFilterLine';
    import SprintItem from "./components/SprintItem";
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import TaskDetail from "./components/TaskDetail";

    export default {
        name: "project-detail-block.vue",
        components: {TaskDetail, SprintItem, NameFilterLine},
        props: {
            projectId: {
                type: String,
                default: ''
            }
        },
        data(){
          return {
              showTaskDetailFlag: false,
              currentTask: {},
          }
        },
        created() {
            this.getProjectSprintList(this.projectId);
        },
        computed: {
            searchKey: {
                get() {
                    return this.$store.state.block.searchKey
                },
                set(val) {
                    this.$store.commit('block/updateSearchKey', val);
                }
            },
            ...mapGetters({
                'sprintTasks': 'block/getSprintTaskList',
                'members': 'block/getMemberList',
                'sprints': 'block/getSprintList',
                'activeSprint': 'block/getActiveSprint',
                'taskTypes': 'block/getTaskTypes',
                'taskPriorities': 'block/getTaskPriorities',
            })
        },
        methods: {
            ...mapActions({
                'getProjectSprintList': 'block/getProjectSprintList',
                'updateTaskChanged': 'block/updateTaskChanged'
            }),
            ...mapMutations({
                'updateSelectedMembers':'block/updateSelectedMembers'
            }),
            showTaskDetail(task){
                this.showTaskDetailFlag = true;
                this.currentTask = task;
            },
            startSprint(sprintId) {
                this.$store.dispatch('block/startSprint', {projectId: this.projectId, sprintId: sprintId})
            },
            createNewSprint() {
                api.sprint.createSprint(this.projectId, item => {
                    this.$store.commit('block/addSprintItem', item)
                })
            },
        }
    }
</script>

<style scoped lang="less">
    .inSprintAction {
        background: lightgoldenrodyellow;
    }
</style>

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
                :tasks="sprintTasks(sprint.id)"
                :taskTypes="taskTypes"
                :taskPriorities="taskPriorities"
                :sprintItem="sprint"
                :active="activeSprint"
                :class="{'inSprintAction':activeSprint && index === 0}"
                @startSprint="startSprint"
                @taskActions="updateTaskChanged"
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
    </v-container>
</template>

<script>
    import api from '@/api';
    import NameFilterLine from '@/components/NameFilterLine';
    import SprintItem from "./components/SprintItem";
    import {mapActions, mapGetters, mapMutations} from 'vuex';

    export default {
        name: "project-detail-block.vue",
        components: {SprintItem, NameFilterLine},
        props: {
            projectId: {
                type: String,
                default: ''
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
                    this.$store.commit('updateSearchKey', val);
                }
            },
            ...mapGetters({
                'sprintTasks': 'getSprintTaskList',
                'members': 'getMemberList',
                'sprints': 'getSprintList',
                'activeSprint': 'getActiveSprint',
                'taskTypes': 'getTaskTypes',
                'taskPriorities': 'getTaskPriorities',
            })
        },
        methods: {
            ...mapActions([
                'getProjectSprintList',
                'updateTaskChanged'
            ]),
            ...mapMutations([
                'updateSelectedMembers'
            ]),
            startSprint(sprintId) {
                this.$store.dispatch('startSprint', {projectId: this.projectId, sprintId: sprintId})
            },
            createNewSprint() {
                api.sprint.createSprint(this.projectId, item => {
                    this.$store.commit('addSprintItem', item)
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

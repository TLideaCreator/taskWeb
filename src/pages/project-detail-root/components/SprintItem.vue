<template>
    <v-list class="mt-1 mb-1">
        <drop @drop="dropItem({task:$event,sprintId:sprint.id})">
            <v-list-group value="true">
                <template v-slot:activator>
                    <v-list-item-title class="smallerFont">
                        {{sprintName}}
                    </v-list-item-title>
                    <v-list-item-action>
                        <v-btn class="smallerFont"
                               v-show="!startSprint"
                               text @click="$emit('startSprint',sprint.id)">
                            开始冲刺
                        </v-btn>
                    </v-list-item-action>
                </template>
                <template
                        v-for="(task, tindex) in taskList"
                >
                    <v-divider :key="tindex"></v-divider>
                    <drag
                            :transfer-data="task"
                            :key="'drag:'+tindex">
                        <v-list-item
                                :key="task.id"
                        >
                            <v-list-item-icon>
                                <v-icon>{{loadTypeIcon(task.type)}}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{task.title}}
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action-text>
                                {{task|exeName}}
                            </v-list-item-action-text>
                        </v-list-item>
                    </drag>

                </template>
            </v-list-group>
            <v-divider></v-divider>
        </drop>

        <v-list-item v-if="!showCreateTask">
            <v-list-item-action>
                <v-btn small icon @click="showNewTaskCreateLine">
                    <v-icon :size="18">
                        add
                    </v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-list-item v-else>
            <v-list-item-content style="max-width: 120px;" class="mr-4">
                <v-select
                        v-model="taskTypeId"
                        :items="taskTypes"
                        item-value="id"
                        item-text="name"
                        :prepend-icon="typeSelectIcon"
                >
                </v-select>
            </v-list-item-content>
            <v-list-item-content>
                <v-text-field
                        v-model="taskTitle"
                        placeholder="请输入任务标题"
                        @keydown="taskTitleChange"
                ></v-text-field>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-list-item-action>
                <v-btn text class="smallerFont" @click="showCreateTask = false">
                    取消
                </v-btn>
            </v-list-item-action>
            <v-list-item-action>
                <v-btn icon small class="smallerFont">
                    <v-icon :size="24">more_horiz</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
    </v-list>

</template>

<script>
    import api from '@/api';
    import {consts, toast} from "@/utils";

    export default {
        name: "SprintItem",
        props: {
            sprintItem: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            taskTypes: {
                type: Array,
                default: () => {
                    return []
                }
            },
            defaultPriorityId: {
                type: String,
                default: ''
            },
            defaultStatusId: {
                type: String,
                default: ''
            },
            tasks: {
                type: Array,
                default: () => {
                    return []
                }
            },
            active:{
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                startSprint: this.active,
                showCreateTask: false,
                taskTypeId: '',
                taskTitle: '',
                taskList: this.tasks,
                sprint: this.sprintItem,
                title: this.sprintItem.name
            }
        },
        watch: {
            active(val){
                this.startSprint = val
            },
            sprintItem(val) {
                this.sprint = val;
                this.title = val.name
            },
            tasks(val) {
                this.taskList = val;
            }
        },
        filters: {

            exeName(task) {
                if (task.executor && task.executor.data && task.executor.data.name) {
                    return task.executor.data.name;
                } else {
                    return '未分配'
                }
            },
        },
        computed: {
            sprintName() {
                if (!this.title || this.title + '' === '0') {
                    return '未分配'
                } else {
                    return `冲刺-S${this.title}`
                }
            },
            typeSelectIcon() {
                let type = this.taskTypes.filter(item => {
                    return item.id === this.taskTypeId
                });
                if (type && type.length > 0) {
                    return type[0].icon
                }
                return '';
            }
        },
        methods: {
            loadTypeIcon(typeId) {
                let type = this.taskTypes.filter(item => {
                    return item.id === typeId
                });
                if (type && type.length > 0) {
                    return type[0].icon
                }
                return '';
            },
            dropItem(item) {
                api.task.moveTaskToSprint(item.task.id, item.sprintId, task => {
                    this.$emit('taskActions', ({from: item.task.sprint_id, to: item.sprintId, task}))
                })
            },
            showNewTaskCreateLine() {
                this.showCreateTask = true;
                this.taskTypeId = this.taskTypes[0].id;
            },
            taskTitleChange(event) {
                if (event.key === 'Enter') {
                    if (consts.stringIsEmptyWithTrim(this.taskTitle)) {
                        toast.error('请输入任务标题');
                        return;
                    }
                    api.task.createTask(this.sprint.id,
                        {
                            title: this.taskTitle,
                            desc: this.taskTitle,
                            type: this.taskTypeId
                        },
                        task => {
                            this.taskTitle = '';
                            this.$emit('taskActions', ({from: '', to: this.sprint.id, task}))
                        })
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .smallerFont {
        font-size: smaller;
    }
</style>

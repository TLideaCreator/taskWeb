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
                               v-show="startSprint"
                               text @click.stop="$emit('startSprint',sprint.id)">
                            开始冲刺
                        </v-btn>
                    </v-list-item-action>
                </template>
                <v-divider v-show="taskList.length === 0"></v-divider>
                <v-list-item v-show="taskList.length === 0">
                    <v-list-item-content>
                        <v-list-item-subtitle>
                            点击下方加号添加任务，您也可以将其他冲刺的任务拖动到当前冲刺中。
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <template
                        v-for="(task, tindex) in taskList"
                >
                    <v-divider :key="tindex"></v-divider>
                    <drag
                            :transfer-data="task"
                            :key="'drag:'+tindex">
                        <v-list-item
                                :key="task.id"
                                @click="$emit('clickItem',task)"
                        >
                            <v-list-item-icon>
                                <v-icon :color="loadPriority(task.priority)">{{loadTypeIcon(task.type)}}</v-icon>
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

        <v-list-item v-show="!showCreateTask">
            <v-list-item-action>
                <v-btn small icon @click="showNewTaskCreateLine">
                    <v-icon :size="18">
                        add
                    </v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-list-item v-show="showCreateTask">
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
                        counter="40"
                ></v-text-field>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-list-item-action>
                <v-btn text class="smallerFont" @click="showCreateTask = false">
                    取消
                </v-btn>
            </v-list-item-action>
            <v-list-item-action>
                <v-btn icon small class="smallerFont" @click="$emit('createNewTask',title)">
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
            taskPriorities: {
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
            active: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                showCreateTask: false,
                taskTypeId: '',
                taskTitle: '',
                sprintActive: this.active,
                taskList: this.tasks,
                sprint: this.sprintItem,
                title: this.sprintItem.name,
                showTaskDetailFlag: false,
                currentTask: {}
            }
        },
        watch: {
            active(val) {
                this.sprintActive = val
            },
            sprintItem(val) {
                this.sprint = val;
                this.title = val.name;
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
                    return '未指派'
                }
            },
        },
        computed: {
            startSprint() {
                return !this.sprintActive && this.sprint.name + '' !== '0'
            },
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
            loadPriority(priorityId) {
                let priority = this.taskPriorities.filter(item => {
                    return item.id === priorityId
                });
                if (priority && priority.length > 0) {
                    return priority[0].color;
                }
                return '';
            },
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
                    this.$emit('taskActions', task)
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
                            this.$emit('taskActions', task)
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

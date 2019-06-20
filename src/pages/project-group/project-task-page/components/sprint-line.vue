<template>
    <drop
            class="sprintDiv"
            @drop="$emit('dropItem',{task:$event, sprintId:sprint.id})"
    >
        <Row type="flex" align="middle" justify="start">
            <Col :span="4">
                <p>
                    {{sprint.name|sprintName}}
                </p>
            </Col>
            <Col :span="16">
                <p>
                    共{{taskList.length}}个问题
                </p>
            </Col>
            <Col :span="4">
                <Button v-show="sprint.status !== 1 && sprint.name !== 0" type="text"
                        @click="$emit('startSprintClick', sprint)">
                    开始冲刺
                </Button>
            </Col>

        </Row>
        <hr>
        <div class="sprintTaskDiv"
             :class="{'sprintTaskEmptyDiv':taskList.length === 0}"
        >
            <drag
                    v-for="task in taskList"
                    :transfer-data="task"
                    :key="task.taskId"
                    :class="{'sprintTaskEmptyDiv':taskList.length === 0 }">
                <TaskLine
                        :item="task"
                        :currentId="currentId"
                        :statusList="statusArray"
                        :taskTypeList="typeList"
                        :taskPriorityList="priorityList"
                        @click.native="$emit('taskClick',task)"
                ></TaskLine>
            </drag>
        </div>
        <div v-show="sprint.status+'' !== '1'">
            <Row v-if="!inCreate" class="mt-5">
                <Button type="text" @click="inCreate=true">
                    <Icon type="ios-add"/>
                    创建任务
                </Button>
            </Row>

            <Row v-else type="flex" justify="space-between" align="top" class="mt-5">
                <Col :span="2">
                    <Select v-model="taskType">
                        <Option v-for="type in taskTypeList"
                                :key="type.id"
                                :value="type.id"
                        >
                            {{type.name}}
                        </Option>
                    </Select>
                </Col>
                <Col :span="6">
                    <Input v-model="createTitle"
                           :readonly="createLoading"
                           style="border: none;"
                           @on-enter="createNewTask"/>
                </Col>
                <Col :span="11">

                </Col>
                <Col :span="5">
                    <Button v-show="!createLoading" type="text" @click="inCreate=false">取消</Button>
                    <Button v-show="!createLoading" type="text" @click="showDetail=true">
                        <Icon type="ios-more" :size="25"/>
                    </Button>
                </Col>
            </Row>
        </div>

    </drop>
</template>

<script>
    import {Drag, Drop} from 'vue-drag-drop';
    import TaskLine from './task-line';
    import {consts} from '@/utils'
    import api from '@/api';
    export default {
        name: "sprint-line",
        components: {Drag, Drop, TaskLine},
        props: {
            sprintItem: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            selectTaskId: {
                type: String,
                default: ''
            },
            sprintTasks: {
                type: Array,
                default: ()=>{
                    return [];
                }
            },
            statusList:{
                type:Array,
                default:()=>{
                    return [];
                }
            },
            taskTypeList:{
                type:Array,
                default:()=>{
                    return [];
                }
            },
            taskPriorityList:{
                type:Array,
                default:()=>{
                    return [];
                }
            },
        },

        data() {
            return {
                tasks: this.sprintTasks,
                sprint: this.sprintItem,
                currentId: this.selectTaskId,
                taskType: this.taskTypeList[0].id,
                inCreate: false,
                createLoading: false,
                createTitle: '',
                typeList: this.taskTypeList,
                statusArray: this.statusList,
                priorityList: this.taskPriorityList,
            }
        },
        watch: {
            taskTypeList(val){
                this.typeList = val;
            },
            statusList(val){
                this.statusArray = val;
            },
            taskPriorityList(val){
                this.priorityList = val;
            },
            sprintItem(val) {
                this.sprint = val;
            },
            selectTaskId(val) {
                this.currentId = val;
            },

            sprintTasks(val){
                this.tasks = val;
            }
        },
        computed: {

            taskList(){
                return [...this.tasks ];
            }
        },
        methods: {
            createNewTask() {
                if (this.createLoading) {
                    return;
                }
                this.createLoading = true;
                if (consts.stringIsEmptyWithTrim(this.createTitle)) {
                    this.createLoading = false;
                    return;
                }
                let priority = {};
                this.priorityList.forEach(item=>{
                        if(item.is_default+''==='1'){
                            priority = item;
                        }
                    }
                );
                api.task.createTask(this.sprint.id, {
                    title: this.createTitle,
                    desc: this.createTitle,
                    type: this.taskType,
                    priority: priority.id,
                } ,result=>{
                    this.createLoading = false;
                    if(result){
                        this.$emit('createNewIssue', result);
                        this.createTitle = '';
                    }
                });
            },

        }
    }
</script>

<style scoped lang="less">
    .sprintDiv {
        min-height: 80px;
        margin: 20px 0;
    }

    .sprintTaskDiv {
        min-height: 40px;
        margin: 5px;
    }

    .sprintTaskEmptyDiv {
        border: 1px lightslategrey dashed;
        border-radius: 5px;
    }

</style>

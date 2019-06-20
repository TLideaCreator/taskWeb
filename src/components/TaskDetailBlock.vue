<template>
    <Layout class="detailLayout" v-show="showBlock">
        <Row type="flex" justify="space-between" align="middle" style="height: 50px;">
            <Col :span="18">
                <div v-if="!editTitle" @click.stop="editTitle = true">
                    <h2 style="min-height: 60px">{{currentTask.title}}</h2>
                </div>
                <Input v-else v-model="currentTask.title" autofocus @on-blur="updateTaskTitle"
                       @on-enter="updateTaskTitle"/>
            </Col>
            <Button class="closeBtn" size="large"
                    @click="$emit('update', false)">
                <Icon type="md-close"></Icon>
            </Button>
        </Row>
        <h3>任务类型</h3>
        <Select v-model="currentTask.type"
                @on-change="updateTaskType"
                >
            <Option v-for="type in projectTaskTypeList"
                    :key="type.id"
                    :value="type.id"
            >
                {{type.name}}
            </Option>
        </Select>
        <h3>任务描述</h3>
        <div v-if="!editDesc" @click.stop="editDesc = true">
            <p style="min-height: 60px">
                {{currentTask.desc}}
            </p>
        </div>
        <div v-else>
            <Input
                    v-model="currentTask.desc"
                    type="textarea"
                    :autosize="{minRows:4, maxRows:6}"
            />
            <Row class="mt-10">
                <Button type="primary" @click="updateTaskInfo(currentTask)">保存</Button>
                <Button type="text" @click="editDesc = false">取消</Button>
            </Row>
        </div>
        <h3>任务状态</h3>
        <Select :value="taskStatus"
                @on-change="updateTaskInfo(currentTask)"
                :disabled="selectStatue">
            <Option v-for="status in projectStatusList"
                    :key="status.id"
                    :value="status.id"
            >
                {{status.name}}
            </Option>
        </Select>
        <h3>指派给</h3>
        <Select :value="taskExecutor"
                @on-change="updateTaskExecutor">
            <Option v-for="member in memberList" :key="member.user_id" :value="member.user_id">
                {{member.username}}
            </Option>
        </Select>
        <h3>监听者</h3>
        <Select :value="taskReport"
                @on-change="updateTaskReporter">
            <Option v-for="member in memberList" :key="member.user_id" :value="member.user_id">
                {{member.username}}
            </Option>
        </Select>
        <h3>优先级</h3>
        <Select :value="taskPriority"
                @on-change="updateTaskPriority">
            <Option v-for="priority in projectPriorityList" :key="priority.id"
                    :value="priority.id"
            >{{priority.name}}
            </Option>
        </Select>
    </Layout>
</template>

<script>
    import {consts} from '@/utils'
    import api from '@/api';
    export default {
        name: "TaskDetailBlock",
        props: {
            taskId: {
                type: String,
                default: ''
            },
            showBlock: {
                type: Boolean,
                default: false
            },
            disabledChangeStatus: {
                type: Boolean,
                default: false
            }
        },
        model: {
            prop: 'showBlock',
            event: 'update'
        },
        data() {
            return {
                currentTaskId: this.taskId,
                currentTask: {},
                editTitle: false,
                editDesc: false,
                editStatus: false,
                editPriority: false,
                editAssignee: false,
                projectMemberList: [],
                selectStatue: this.disabledChangeStatus,
                projectStatusList: [],
                projectTaskTypeList: [],
                projectPriorityList: [],
            }
        },
        computed: {
            memberList() {
                return [
                    {
                        user_id: '-1',
                        username: '未指派'
                    },
                    ...this.projectMemberList
                ]
            },
            taskExecutor(){
                return consts.stringIsEmptyWithTrim(this.currentTask.exe_id)?'-1': this.currentTask.exe_id
            },
            taskStatus(){
                return consts.stringIsEmptyWithTrim(this.currentTask.status)?'-1': this.currentTask.status
            },
            taskPriority(){
                return consts.stringIsEmptyWithTrim(this.currentTask.priority)?'-1': this.currentTask.priority
            },
            taskReport(){
                return consts.stringIsEmptyWithTrim(this.currentTask.report_id)?'-1': this.currentTask.report_id
            }
        },
        watch: {
            taskId(val) {
                if (this.showBlock && this.currentTaskId !== val) {
                    this.currentTaskId = val;
                    this.getTaskDetail();
                }
            },
            showBlock(val) {
                if (val) {
                    this.getTaskDetail()
                }
            },
            disabledChangeStatus(val) {
                this.selectStatue = val
            }
        },
        methods: {
            updateTaskTitle() {
                this.editTitle = false;
                this.updateTaskInfo(this.currentTask);
            },
            getTaskDetail() {
                api.task.getTaskDetail(this.currentTaskId, (task, meta)=>{
                    this.currentTask = task;
                    this.projectMemberList = meta.project_members;
                    this.projectStatusList = meta.project_status;
                    this.projectTaskTypeList = meta.project_types;
                    this.projectPriorityList = meta.project_priorities;
                });
            },
            updateTaskInfo(task) {
                api.task.updateTaskInfo(task, (result)=>{
                    this.$emit('updateTask', result.data);
                    this.currentTask = result.data;
                    this.editDesc = false;
                });
            },
            updateTaskExecutor(exeId){
                let task = consts.objectCopy(this.currentTask);
                if(exeId === '-1'){
                    task.exe_id = '';
                }else{
                    task.exe_id = exeId;
                }
               this.updateTaskInfo(task);
            },
            updateTaskReporter(reportId){
                let task = consts.objectCopy(this.currentTask);
                if(reportId === '-1'){
                    task.report_id = '';
                }else{
                    task.report_id = reportId;
                }
                this.updateTaskInfo(task);
            },

            updateTaskPriority(priorityId){
                let task = consts.objectCopy(this.currentTask);
                if(priorityId === '-1'){
                    task.priority = '';
                }else{
                    task.priority = priorityId;
                }
               this.updateTaskInfo(task);
            },
            updateTaskType(type){
                let task = consts.objectCopy(this.currentTask);
                if(type === '-1'){
                    task.type = '';
                }else{
                    task.type = type;
                }
                this.updateTaskInfo(task);
            },

        }
    }
</script>

<style scoped lang="less">
    .detailLayout {
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
        background: transparent;

        h3 {
            margin: 10px 0;
        }

        .closeBtn {
            border-radius: 50%;
            width: 30px;
            height: 30px;
            padding: 0
        }

        p {
            color: #000;
            font-size: 14px;
            margin: 5px 0;
        }
    }
</style>

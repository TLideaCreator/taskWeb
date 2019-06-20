<template>
    <Row type="flex" justify="space-between" align="middle"
         class="taskRowLine"
         :class="{'taskRowLineSelected':selectedId === task.id}"
    >
        <Col :span="18">
            <span style="margin-left: 5px; font-size: 12px">
                <Icon :type="getTaskTypeIcon" :size="20"></Icon>
                {{task.title}}
            </span>
        </Col>
        <Col :span="2">
            <span style="margin-right: 20px">{{priorityObj.name}}</span>
        </Col>
        <Col :span="2">
            <Avatar v-show="task.executor" :src="taskAvatar">{{avatarName}}</Avatar>
        </Col>
    </Row>
</template>

<script>
    import {consts} from "@/utils";

    export default {
        name: "task-line",
        props: {
            item: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            currentId: {
                type: String,
                default: ''
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
                task: this.item,
                selectedId: this.currentId,
                priorities: this.taskPriorityList,
                types: this.taskTypeList,
            }
        },
        watch: {
            item(val) {
                this.task = val;
            },
            currentId(val) {
                this.selectedId = val
            },
            taskTypeList(val){
                this.types = val;
            },
            taskPriorityList(val){
                this.priorities = val;
            }
        },
        computed: {
            taskAvatar() {
                return consts.formatAvatarSrc(this.task.executor);
            },
            avatarName() {
                if (this.task.executor && this.task.executor.data) {
                    return this.task.executor.data.name.substr(-2, 2);
                }
                return '';
            },
            getTaskTypeIcon() {
                let taskType = {};
                this.types.forEach(item=>{
                    if(item.id === this.task.type){
                        taskType = item;
                    }
                });
                return taskType.icon;
            },
            priorityObj() {
                let priority = {};
                this.priorities.forEach(item=>{
                    if(item.id === this.task.priority){
                        priority = item;
                    }
                });
                return priority;
            }
        }
    }
</script>

<style scoped lang="less">
    .stateColCss {
        height: 35px;
        font-size: 16px;
        font-weight: bold;
        background: white;
        border-radius: 3px;
    }

    .taskRowLine {
        height: 44px;
        width: 99%;
        padding-left: 10px;
        padding-right: 10px;
        border-bottom: 1px solid #6d6d6d;
        background: white;
        color: black;
    }

    .taskRowLine:hover {
        background: #add5ff;
        color: white;
    }

    .taskRowLineSelected {
        background: #51a9ff;
        color: white;
    }


</style>

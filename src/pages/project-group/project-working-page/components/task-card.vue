<template>
    <div class="cardCss"
         onselectstart="return false"
    >

        <h4>
            <Tooltip max-width="400" :content="taskInfo.desc" style="width: 100%" :delay="500">
                <p class="singleLine"  :class="titleStatus">{{taskInfo.title}}</p>
            </Tooltip>
        </h4>

        <Row type="flex" justify="space-around" align="middle">
            <Col :span="1">
                <Icon :type="taskTypeIcon" class="typeClass" :style="{background:taskPriorityObj.color}"></Icon>
            </Col>
            <Col :span="4">
                <span style="font-size: 12px" :style="{color:taskPriorityObj.color}">{{taskPriorityObj.name}}</span>
            </Col>
            <Col :span="13">
                <span v-show="this.taskInfo.end_time" class="timeClass" :style="timeColor">{{taskInfo.end_time}}</span>
            </Col>
            <Tooltip v-show="executor" :content="executor.name">
                <Col :span="2">
                    <Avatar size="small" class="avatarClass" v-show="executor.name" :src="avatarSrc">
                        {{executor.name.substr(0,1)}}
                    </Avatar>
                </Col>
            </Tooltip>
        </Row>
    </div>

</template>

<script>
    import {date, consts} from '@/utils'

    export default {
        name: "task-card",
        props: {
            task: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            prioritiesList:{
                type: Array,
                default: ()=>{
                    return []
                }
            },
            typesList:{
                type: Array,
                default: ()=>{
                    return []
                }
            },
            statusList:{
                type: Array,
                default: ()=>{
                    return []
                }
            }
        },
        data() {
            return {
                taskInfo: this.task
            }
        },
        watch: {
            task(val) {
                this.taskInfo = val
            }
        },
        computed: {
            avatarSrc(){
              return consts.formatAvatarSrc(this.taskInfo.executor)
            },
            titleStatus() {
                let status = {};
                this.statusList.forEach(item=>{
                    if(item.id === this.taskInfo.status){
                        status = item;
                    }
                });
                return status.type + '' === '2' ? 'finish' : ''
            },
            taskTypeIcon() {
                let type = {};
                this.typesList.forEach(item=>{
                    if(item.id === this.taskInfo.type){
                        type = item;
                    }
                });
                return type.icon;
            },
            taskPriorityObj(){
                let priority = {};
                this.prioritiesList.forEach(item=>{
                    if(item.id === this.taskInfo.priority){
                        priority = item;
                    }
                });
                return priority;
            },
            executor(){
                if(this.taskInfo.executor && this.taskInfo.executor.data){
                    return this.taskInfo.executor.data
                }else{
                    return {};
                }
            },
            timeColor() {
                let color = '#25cb3d';
                let today = new Date();
                today.setHours(0);
                today.setMinutes(0);
                today.setSeconds(0);
                today.setMilliseconds(0);
                let endDate = new Date();
                if(this.taskInfo.endTime){
                    endDate = date.stringToDate(this.taskInfo.endTime.replace(/-/g, ''));
                }

                if (endDate > today) {
                    color = '#25cb3d';
                } else if (endDate === today) {
                    color = '#d19143';
                } else {
                    color = '#cb5010';
                }

                return {background: color}
            }
        }
    }
</script>

<style scoped lang="less">
    .cardCss {
        width: 100%;
        background: #228ae2;
        margin-bottom: 5px;
        height: 70px;
        padding: 2px;
        color: white;
        border-radius: 3px;

        h4 {
            width: 100%;
            padding: 0 2px;
        }

        .finish {
            text-decoration: line-through
        }

        .avatarClass {
            background: white;
            color: #228ae2;
        }

        .timeClass {
            font-size: 12px;
            background: darkseagreen;
            border-radius: 10px;
            padding: 2px 5px;
        }

        .typeClass {
            border-radius: 2px;
            width: 15px;
            height: 15px;
            text-align: center;
        }
    }

    .cardCss:hover {
        -webkit-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
    }

</style>

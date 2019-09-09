<template>
    <v-container fluid class="pl-10 pr-10">
        <v-layout justify-space-between>
            <v-flex md6>
                <v-text-field
                        v-model="task.title"
                        label="标题"
                        single-line
                        placeholder="请输入任务标题"
                        counter="40"
                        @keydown="updateTaskInput"
                ></v-text-field>
                <v-select
                        v-model="task.exe_id"
                        label="指派给"
                        width="100px"
                        outlined
                        item-value="user_id"
                        item-text="username"
                        :items="members"
                        @change="updateTaskInfo"
                >

                </v-select>
                <h5>任务描述</h5>
                <RichEditor
                        v-model="task.desc"
                        :editable="editable"
                        @addImg="uploadFileForTask"
                        style="height: 300px"
                        @save="updateTaskInfo"
                        @click.native = "editable = true"
                ></RichEditor>

                <v-list style="background: transparent">
                    <v-list-item-subtitle
                        v-for="history of histories"
                        :key="'key'+history"
                    >{{history}}</v-list-item-subtitle>
                </v-list>

            </v-flex>
            <v-flex md4>

                <v-select
                        v-model="task.report_id"
                        label="观察者"
                        outlined
                        item-value="user_id"
                        item-text="username"
                        :items="members"
                        @change="updateTaskInfo"
                >

                </v-select>
                <v-select
                        v-model="task.status"
                        :items="status"
                        item-value="id"
                        item-text="name"
                        label="状态"
                        outlined
                        @change="updateTaskInfo"
                ></v-select>
                <v-select
                        v-model="task.priority"
                        label="优先级"
                        :items="priorities"
                        item-value="id"
                        item-text="name"
                        outlined
                        @change="updateTaskInfo"
                ></v-select>
                <v-text-field
                        v-model="task.points"
                        label="任务点数"
                        outlined
                        type="number"
                        step="0.5"
                        suffix="点"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
            <v-flex md6>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import api from '@/api';
    import {consts, toast} from '@/utils';
    import RichEditor from "../../components/RichEditor";
    export default {
        name: "project-task-detail.vue",
        components: {RichEditor},
        props:{
            projectId:{
                type:String,
                default: ''
            },
            taskId: {
                type:String,
                default: ''
            },
        },
        data(){
            return {
                task:{},
                priorities: [],
                members: [],
                status: [],
                types: [],
                histories: [],
                editable:false
            }
        },
        created() {
            this.getTaskDetail();
        },
        methods:{
            updateTaskInput(event){
                if(event.key === 'Enter'){
                    if(consts.stringIsEmptyWithTrim(this.task.title)){
                        toast.error('请输入任务标题');
                        return;
                    }
                    if(consts.stringIsEmptyWithTrim(this.task.desc)){
                        toast.error('请输入任务描述');
                        return;
                    }
                    this.updateTaskInfo();
                }
            },
            getTaskDetail(){
                api.task.getTaskDetail(this.taskId, (task, meta)=>{
                    this.task = task;
                    this.members = [{user_id:'', username: '暂不指派'},...meta.project_members];
                    this.priorities = meta.project_priorities;
                    this.status = meta.project_status;
                    this.types = meta.project_types;
                })
            },
            updateTaskInfo(){
                api.task.updateTaskInfo(this.task, task=>{
                    this.task = task;
                    this.editable = false
                })
            },
            uploadFileForTask(file, callback){
                api.task.updateTaskFile(this.task.project_id,this.taskId,file, (url)=>{
                    callback(url);
                })
            }
        }
    }
</script>

<style scoped>

</style>

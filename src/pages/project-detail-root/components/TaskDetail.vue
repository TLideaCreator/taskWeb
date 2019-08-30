<template>
    <v-card>
        <v-card-text>
            <v-layout class="pt-5" align-center>
                <h3>{{project.name}}-{{task.indexes}}</h3>
                <v-spacer></v-spacer>
                <v-btn icon @click="changeSize">
                    <v-icon>fullscreen</v-icon>
                </v-btn>
                <v-btn icon @click="$emit('cancel')">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-layout>
        </v-card-text>
        <v-divider class="ml-4 mr-4"></v-divider>
        <v-card-text>
            <v-layout justify-space-between class="mt-5">
                <v-flex md6>
                    <v-text-field
                            v-model="task.title"
                            label="标题"
                            placeholder="请输入任务标题"
                            counter="40"
                            @keydown="updateTaskInput"
                    ></v-text-field>
                    <v-textarea
                            v-model="task.desc"
                            counter="512"
                            label="任务描述"
                            outlined
                            @keydown="updateTaskInput"
                    >
                    </v-textarea>
                    <v-divider></v-divider>

                </v-flex>
                <v-flex md4>
                    <v-select
                            v-model="task.exe_id"
                            label="指派给"
                            outlined
                            item-value="user_id"
                            item-text="username"
                            :items="members"
                            @change="updateTaskInfo"
                    >

                    </v-select>
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
        </v-card-text>
        <v-divider class="ml-4 mr-4"></v-divider>
    </v-card>
</template>

<script>
    import api from '@/api';
    import {consts, toast, router} from "@/utils";
    export default {
        name: "TaskDetail",
        props: {
            taskId: {
                type: String,
                default: ''
            },
            statusList:{
                type: Array,
                default: ()=>{
                    return []
                }
            },
            project: {
                type: Object,
                default: ()=>{
                    return {}
                }
            }
        },
        data() {
            return {
                currentId: this.taskId,
                task: {},
                priorities: [],
                types: [],
                status: [],
                members: [],
            }
        },
        created(){
            this.getTaskDetail();
        },
        watch: {
            taskId(val) {
                this.currentId = val;
                this.getTaskDetail();
            }
        },
        methods:{
            changeSize(){
                router.replace({
                    'name': 'projectDetailTaskDetailPage',
                    params: {
                        projectId: this.task.project_id,
                        taskId: this.task.id
                    }
                });
            },
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
                api.task.getTaskDetail(this.currentId, (task, meta)=>{
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
                    this.$emit('taskUpdate', task);
                })
            }
        }
    }
</script>

<style scoped>

</style>

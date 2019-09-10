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
                <v-row justify="space-between">
                    <v-col cols="4">
                        <h5>任务描述</h5>
                    </v-col>
                    <v-btn
                            v-show="!editable"
                            @click="editable = true"
                            text color="primary" small>
                        <v-icon>edit</v-icon>编辑
                    </v-btn>
                    <v-btn
                            v-show="editable"
                            @click="updateTaskInfo"
                            text color="primary" small>
                        <v-icon>save</v-icon>保存
                    </v-btn>
                </v-row>
                <RichEditor
                        :saveActive="false"
                        v-model="task.desc"
                        :editable="editable"
                        @addImg="uploadFileForTask"
                        style="height: 300px"
                ></RichEditor>

                <v-list style="background: transparent">
                    <v-list-item-subtitle
                            v-for="history of histories"
                            :key="'key'+history"
                    >{{history}}
                    </v-list-item-subtitle>
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
            <v-flex md10>
                <v-row justify="end" style="height: 70px">
                    <v-col cols="6">
                        <v-pagination
                                v-show="totalLength > 1"
                                v-model="currentPage"
                                :length="totalLength"
                                :total-visible="5"
                                circle
                        ></v-pagination>
                    </v-col>
                </v-row>
                <CommentItem
                        v-for="comment in commentList"
                        :key="comment.id"
                        style="padding: 5px 0"
                        :commentItem="comment"
                        @delComment="deleteDetermine"
                ></CommentItem>
                <RichEditor
                        class="mt-2"
                        v-model="commentContent"
                        :editable="true"
                        :saveActive="false"
                        :height="200"
                        @addImg="uploadFileForTask"
                >

                </RichEditor>
                <v-row justify="end" style="padding: 12px">
                    <v-btn color="success" @click="createNewComment">新增评论</v-btn>
                </v-row>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import api from '@/api';
    import {consts, toast, modal} from '@/utils';
    import RichEditor from "../../components/RichEditor";
    import CommentItem from "./components/CommentItem";

    export default {
        name: "project-task-detail.vue",
        components: {CommentItem, RichEditor},
        props: {
            projectId: {
                type: String,
                default: ''
            },
            taskId: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                task: {},
                priorities: [],
                members: [],
                status: [],
                types: [],
                histories: [],
                editable: false,
                commentList: [],
                currentPage: 1,
                totalLength: 0,
                commentContent: ''
            }
        },
        created() {
            this.getTaskDetail();
            this.getTaskComments();
        },
        methods: {
            updateTaskInput(event) {
                if (event.key === 'Enter') {
                    if (consts.stringIsEmptyWithTrim(this.task.title)) {
                        toast.error('请输入任务标题');
                        return;
                    }
                    if (consts.stringIsEmptyWithTrim(this.task.desc)) {
                        toast.error('请输入任务描述');
                        return;
                    }
                    this.updateTaskInfo();
                }
            },
            getTaskDetail() {
                api.task.getTaskDetail(this.taskId, (task, meta) => {
                    this.task = task;
                    this.members = [{user_id: '', username: '暂不指派'}, ...meta.project_members];
                    this.priorities = meta.project_priorities;
                    this.status = meta.project_status;
                    this.types = meta.project_types;
                })
            },
            updateTaskInfo() {
                api.task.updateTaskInfo(this.task, task => {
                    this.task = task;
                    this.editable = false
                })
            },
            uploadFileForTask(file, callback) {
                api.task.updateTaskFile(this.task.project_id, this.taskId, file, (url) => {
                    callback(url);
                })
            },
            createNewComment(){
                api.taskComment.createTaskComments(this.taskId,{content:this.commentContent}, (item)=>{
                    this.commentList.push(item.data);
                    this.commentContent = '';
                })
            },
            getTaskComments() {
                api.taskComment.getTaskComments(this.taskId, {}, (data, meta) => {
                    this.commentList = data;
                    this.currentPage = meta.page;
                    this.totalLength = Math.ceil(meta.total / meta.per_page)
                })
            },
            deleteDetermine(comment){
                modal.confirm({
                    content: `确认删除当前评论？`,
                    callback: () => {
                        api.taskComment.delTaskComments(comment.task_id,comment.id, list => {
                            this.commentList = list;
                            modal.dismiss();
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>

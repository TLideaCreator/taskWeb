<template>
    <v-layout wrap justify-space-between style="margin: 10px 0">
        <v-flex sm12 md6>
            <v-card class="mr-4">
                <v-img :src="templateInfo.img" height="200px">
                    <v-card-title class="align-end fill-height">
                        模板详情
                    </v-card-title>
                </v-img>

                <v-divider></v-divider>
                <v-card-text>
                    <v-text-field
                            :disabled="!editable"
                            v-model="templateInfo.name"
                            label="模板标题" placeholder="请输入模板标题"></v-text-field>
                    <v-textarea label="模板描述"
                                placeholder="请输入模板描述"
                                v-model="templateInfo.desc"
                                :disabled="!editable"
                                :clearable="editable"
                    ></v-textarea>
                    <v-file-input
                            v-show="editable"
                            label="请选择需要上传的封面图片">
                    </v-file-input>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="info" class="mr-3" @click="editable=true" v-if="!editable">修改</v-btn>
                    <v-btn color="info" class="mr-3" @click="updateTemplate" v-else>保存</v-btn>

                    <v-dialog v-model="deleteDialog" max-width="300">
                        <template v-slot:activator="{on}">
                            <v-btn color="error" v-on="on" v-show="!editable">删除</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>提示</v-card-title>
                            <v-card-text>点击删除按钮，删除模板:{{templateInfo.name}}?</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="error" @click="deleteTemplate">删除</v-btn>
                                <v-btn @click="deleteDialog=false">取消</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-btn @click="cancelUpdate" v-show="editable">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex sm12 md6>
            <v-card clas="ml-4">
                <v-card-title>模板概述</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-list>
                        <template v-for="item in overviewItems">
                            <v-list-item
                                         :key="'item:'+item.key"
                                         :replace="true"
                                         :to="{name:item.path, params:{templateId:templateId}}"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{templateStatus[item.key]}}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        {{item.title}}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-icon>
                                    <v-icon color="white" style="background: #888888; border-radius: 50%" :size="24">navigate_next
                                    </v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                            <v-divider
                                    :key="'divider:'+item.key"
                            ></v-divider>
                        </template>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import api from '@/api';
    import {consts} from '@/utils';
    export default {
        name: "admin-template-detail.vue",
        props: {
            templateId: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                template: {},
                templateInfo: {},
                templateStatus: {},
                editable: false,
                deleteDialog: false,
            }
        },
        created() {
            this.loadTemplateDetail();
        },
        computed: {
            overviewItems() {
                return [
                    {
                        title: '模板角色',
                        key: 'role_count',
                        path: 'systemTempRolePage'
                    },
                    {
                        title: '模板类型',
                        key: 'type_count',
                        path: 'systemTempTypePage'
                    },
                    {
                        title: '模板状态',
                        key: 'status_count',
                        path: 'systemTempStatusPage'
                    },
                    {
                        title: '模板优先级',
                        key: 'priority_count',
                        path: 'systemTempPriorityPage'
                    }
                ]
            }
        },
        methods: {
            loadTemplateDetail() {
                api.template.getDetail(this.templateId, (template, meta) => {
                    this.template = template;
                    this.templateInfo = consts.objectCopy(template);
                    this.templateStatus = meta;
                })
            },
            updateTemplate(){
                api.template.update(this.templateId,this.templateInfo, template=>{
                    this.template = template;
                    this.editable = false;
                });
            },
            deleteTemplate(){},
            cancelUpdate(){
                this.editable = false;
                this.templateInfo = consts.objectCopy(this.template);
            }
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>

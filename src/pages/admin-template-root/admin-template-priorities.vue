<template>
    <v-container fluid>
        <v-list style="background: transparent">
            <template v-for="(priority,index) in prioritiesList">
                <v-list-item :key="priority.id">
                    <v-list-item-icon>
                        <v-avatar :color="priority.color" :size="32">
                        </v-avatar>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{priority.name}}</v-list-item-title>
                    </v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-list-item-action>
                        {{priority.is_default?'默认优先级': ''}}
                    </v-list-item-action>
                    <v-spacer></v-spacer>
                    <v-list-item-action>
                        <v-btn icon text small color="info" @click="showEditPriorityDialog(priority)">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </v-list-item-action>
                    <v-list-item-action v-show="prioritiesList.length > 1">
                        <v-btn icon text small color="error" @click="showDelPriorityDialog(priority)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
                <v-divider :key="'divider:'+index"></v-divider>
            </template>
        </v-list>
        <v-btn
                absolute
                dark
                color="success"
                right
                top
                @click="newPriorityDialog = true"
        >
            <v-icon>add</v-icon>
            新优先级
        </v-btn>

        <v-dialog
                v-model="newPriorityDialog"
                max-width="350"
                persistent
        >
            <v-card>
                <v-card-title>新建优先级</v-card-title>
                <v-card-text>
                    <v-text-field v-model="newPriority.name"></v-text-field>
                    <v-color-picker v-model="newPriority.color"
                                    mode="hexa" hide-mode-switch
                    ></v-color-picker>
                    <v-switch v-model="newPriority.is_default"
                              :true-value="1"
                              :false-value="0"
                              label="默认优先级"
                    >
                    </v-switch>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="success" @click="createNewPriority">
                        创建
                    </v-btn>
                    <v-btn text @click="newPriorityDialog=false">
                        取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
                v-model="editPriorityDialog"
                max-width="350"
                persistent
        >
            <v-card>
                <v-card-title>修改优先级</v-card-title>
                <v-card-text>
                    <v-text-field v-model="editPriority.name"></v-text-field>
                    <v-color-picker v-model="editPriority.color"
                                    mode="hexa" hide-mode-switch
                    ></v-color-picker>
                    <v-switch v-model="editPriority.is_default"
                              :true-value="1"
                              :false-value="0"
                              label="默认优先级"
                    >
                    </v-switch>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="info" @click="savePriorityChange">
                        保存
                    </v-btn>
                    <v-btn text  @click="editPriorityDialog=false">
                        取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
                v-model="delPriorityDialog"
                max-width="350"
                persistent
        >
            <v-card>
                <v-card-title>删除优先级</v-card-title>
                <v-card-text>
                    是否删除优先级：{{delPriority.name}}
                    <span v-show="delPriority.is_default">(此优先级是默认优先级)</span>?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="error" @click="deletePriorityItem">
                        删除
                    </v-btn>
                    <v-btn text @click="delPriorityDialog=false">
                        取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import api from '@/api';
    import {consts} from "@/utils";

    export default {
        name: "admin-template-status",
        props: {
            templateId: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                prioritiesList: [],
                editPriority: {},
                editPriorityDialog: false,
                newPriority: {
                    name: '',
                    color: '',
                    is_default: 0,
                },
                newPriorityDialog: false,
                delPriority: {},
                delPriorityDialog: false,
            }
        },
        created() {
            this.getSystemTemplatePriorityList();
        },
        methods: {
            getSystemTemplatePriorityList() {
                api.template.getSystemTemplatePriorityList(this.templateId, list => {
                    this.prioritiesList = list;
                })
            },
            showEditPriorityDialog(priority) {
                this.editPriority = consts.objectCopy(priority);
                this.editPriorityDialog = true;
            },
            savePriorityChange() {
                api.template.updateSystemTemplatePriority(this.editPriority, list => {
                    this.prioritiesList = list;
                    this.editPriorityDialog = false;
                })
            },
            showDelPriorityDialog(priority) {
                this.delPriority = priority;
                this.delPriorityDialog = true;
            },
            deletePriorityItem(){
                api.template.deleteSystemTemplatePriority(this.delPriority, list=>{
                    this.prioritiesList = list;
                    this.delPriorityDialog = false;
                })
            },
            createNewPriority(){
                api.template.createSystemTemplatePriority(this.templateId, this.newPriority, list=>{
                    this.prioritiesList = list ;
                    this.newPriority = {
                        name: '',
                        color: '',
                        is_default: 0
                    };
                    this.newPriorityDialog = false;
                })
            }
        }
    }
</script>

<style scoped lang="less">
</style>

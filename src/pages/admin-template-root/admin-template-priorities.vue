<template>
    <v-container fluid>
        <v-list style="background: transparent">
            <template v-for="(priority,index) in prioritiesList">
                <drop :key="priority.id"
                    @drop="updatePrioritySequence({$event,index})"
                >
                    <drag
                            :draggable="draggable"
                            :transfer-data="{priority, index}"
                    >
                        <v-list-item >
                            <v-list-item-icon>
                                <v-icon>{{index|statusMoveIcon(prioritiesList.length)}}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-avatar
                                    :style="{background: priority.color}"
                                    class="mr-5"
                            >
                            </v-list-item-avatar>
                            <v-list-item-content style="width: 300px">
                                <v-list-item-title>{{priority.name}}</v-list-item-title>
                            </v-list-item-content>

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
                    </drag>
                </drop>
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
    </v-container>
</template>

<script>
    import api from '@/api';
    import {consts,modal} from "@/utils";

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
                draggable: true
            }
        },
        created() {
            this.getSystemTemplatePriorityList();
        },
        filters: {
            statusMoveIcon(index, listLength) {
                if (listLength === 0) {
                    return '';
                } else {
                    if (index === 0) {
                        return 'expand_more';
                    } else if (index === (listLength - 1)) {
                        return 'expand_less';
                    } else {
                        return 'unfold_more';
                    }
                }
            }
        },
        methods: {
            getSystemTemplatePriorityList() {
                api.template.priority.getList(this.templateId, list => {
                    this.prioritiesList = list;
                })
            },
            showEditPriorityDialog(priority) {
                this.editPriority = consts.objectCopy(priority);
                this.editPriorityDialog = true;
            },
            savePriorityChange() {
                api.template.priority.update(this.editPriority, list => {
                    this.prioritiesList = list;
                    this.editPriorityDialog = false;
                })
            },
            showDelPriorityDialog(priority) {
                let content = `是否删除优先级：${priority.name}`;
                if(priority.is_default){
                    content = content + '(此优先级是默认优先级)'
                }
                content = content + '?';
                modal.confirm({
                    content: content,
                    callback: ()=>{
                        api.template.priority.delete(priority, list=>{
                            this.prioritiesList = list;
                            modal.dismiss();
                        })
                    }
                })
            },
            createNewPriority(){
                api.template.priority.create(this.templateId, this.newPriority, list=>{
                    this.prioritiesList = list ;
                    this.newPriority = {
                        name: '',
                        color: '',
                        is_default: 0
                    };
                    this.newPriorityDialog = false;
                })
            },
            updatePrioritySequence(event){
                this.draggable = false;
                let fromIndex = event.$event.index+1;
                let toIndex = event.index+1;

                if (fromIndex === toIndex) {
                    this.draggable = true;
                    return;
                }
                api.template.priority.updateIndex(this.templateId, {from: fromIndex, to: toIndex}, list => {
                    if (list) {
                        this.prioritiesList = [...list].sort((a, b) => {
                            return a.indexes - b.indexes
                        });
                    }
                    this.draggable = true;
                })
            }
        }
    }
</script>

<style scoped lang="less">
</style>

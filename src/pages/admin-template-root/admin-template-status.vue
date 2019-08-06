<template>
    <v-container fluid>
        <v-list style="background: transparent">
            <template v-for="(status, index) in statusList">
                <drop
                        :key="status.id"
                        @drop="dropItem({$event,index})">
                    <drag
                            :transfer-data="{status, index}"
                    >
                        <v-list-item
                        >
                            <v-list-item-icon>
                                <v-icon>
                                    {{index|statusMoveIcon(statusList.length)}}
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{status.name}}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-avatar
                                    :style="{background: status.color}"
                            ></v-list-item-avatar>
                            <v-spacer></v-spacer>
                            <v-list-item-action>
                                <v-btn icon text
                                       color="primary" small
                                       @click="editStatusItem(status)"
                                >
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </v-list-item-action>
                            <v-list-item-action>
                                <v-btn icon text
                                       @click="deleteStatusItem(status)"
                                       color="error" small>
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </drag>
                </drop>
                <v-divider :key="index+':divider:'+status.id"></v-divider>
            </template>
        </v-list>
        <v-dialog v-model="editStatusDialog"
                  :max-width="dialogMaxWidth"
                  persistent
        >
            <v-card
            >
                <v-card-title>修改状态</v-card-title>
                <v-card-text>
                    <v-text-field v-model="editStatus.name"></v-text-field>
                    <v-color-picker v-model="editStatus.color"
                                    mode="hexa" hide-mode-switch
                    ></v-color-picker>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="updateTemplateStatusList">
                        保存
                    </v-btn>
                    <v-btn text @click="editStatusDialog = false">
                        取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="newStatusDialog"
                  :max-width="dialogMaxWidth"
                  persistent
        >
            <v-card>
                <v-card-title>新建状态</v-card-title>
                <v-card-text>
                    <v-text-field v-model="newStatus.name"></v-text-field>
                    <v-color-picker v-model="newStatus.color"
                                    mode="hexa" hide-mode-switch
                    ></v-color-picker>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="createTemplateStatus">
                        创建
                    </v-btn>
                    <v-btn text @click="newStatusDialog = false">
                        取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="delStatusDialog"
                  :max-width="dialogMaxWidth"
        >
            <v-card>
                <v-card-title>
                    提示
                </v-card-title>
                <v-card-text>
                    确认删除{{delStatus.name}}吗？
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="error" @click="deleteTemplateStatus">
                        删除
                    </v-btn>
                    <v-btn text @click="delStatusDialog = false">
                        取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-btn
                absolute
                dark
                color="success"
                right
                top
                @click="addNewStatusItem"
        >
            <v-icon>add</v-icon>
            新状态
        </v-btn>
    </v-container>
</template>

<script>
    import api from '@/api';
    import {consts} from '@/utils';

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
                dialogMaxWidth: 350,
                statusList: [],
                newStatusDialog: false,
                newStatus: {
                    name: '',
                    color: ''
                },
                editStatusDialog: false,
                editStatus: {
                    name: '',
                    color: ''
                },
                delStatusDialog: false,
                delStatus: {
                    name: '',
                    color: ''
                }
            }
        },
        created() {
            this.getTemplateStatusList();
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
            dropItem(event) {
                let fromIndex = event.$event.index;
                let toIndex = event.index;

                if (fromIndex === toIndex) {
                    return;
                }
                let status = event.$event.status;

                if (fromIndex < toIndex) {
                    this.statusList.splice((toIndex + 1), 0, status);
                    this.statusList.splice(fromIndex, 1);
                } else {
                    this.statusList.splice(toIndex, 0, status);
                    this.statusList.splice((fromIndex + 1), 1);
                }
            },
            addNewStatusItem() {
                this.newStatusDialog = true
            },
            editStatusItem(status) {
                this.editStatus = consts.objectCopy(status);
                this.editStatusDialog = true;
            },
            deleteStatusItem(status) {
                this.delStatus = status;
                this.delStatusDialog = true;
            },
            getTemplateStatusList() {
                api.template.getTemplateStatus(this.templateId, list => {
                    this.statusList = [...list].sort((a, b) => {
                        return a.indexes - b.indexes
                    });
                })
            },
            createTemplateStatus() {
                api.template.createTemplateStatus(this.templateId, this.newStatus, list => {
                    this.newStatusDialog = false;
                    this.statusList = [...list].sort((a, b) => {
                        return a.indexes - b.indexes
                    });
                });
            },
            deleteTemplateStatus() {
                api.template.deleteTemplateStatus(this.delStatus, list => {
                    this.delStatusDialog = false;
                    this.statusList = [...list].sort((a, b) => {
                        return a.indexes - b.indexes
                    });
                });
            },
            updateTemplateStatusList() {
                api.template.updateTemplateStatus(this.editStatus, list => {
                    this.editStatusDialog = false;
                    this.statusList = [...list].sort((a, b) => {
                        return a.indexes - b.indexes
                    });
                })
            }
        }
    }
</script>

<style scoped lang="less">

</style>

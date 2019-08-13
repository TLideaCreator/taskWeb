<template>
    <v-container fluid>
        <v-list style="background: transparent">
            <template v-for="type in typeList">
                <v-list-item :key="type.id">
                    <v-list-item-avatar>
                        <v-avatar>
                            <v-icon color="black">{{type.icon}}</v-icon>
                        </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{type.name}}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn small icon text color="info" @click="showUpdateDialog(type)">
                            <v-icon>
                                edit
                            </v-icon>
                        </v-btn>
                    </v-list-item-action>
                    <v-list-item-action>
                        <v-btn small icon text color="error" @click="deleteTemplateType(type)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
                <v-divider :key="'divider:'+type.id"></v-divider>
            </template>
        </v-list>
        <v-btn
                absolute
                dark
                color="success"
                right
                top
                @click="newTypeDialog = true"
        >
            <v-icon>add</v-icon>
            新类型
        </v-btn>
        <v-dialog v-model="newTypeDialog"
                  max-width="350"
                  persistent
        >
            <v-card>
                <v-card-title>创建新类型</v-card-title>
                <v-card-title>
                    <v-text-field v-model="newType.name"
                                  placeholder="请输入类型名称"
                                  label="类型"
                    ></v-text-field>
                    <v-text-field v-model="newType.icon"
                                  :append-icon="newType.icon"
                                  placeholder="请输入类型图标"
                                  label="图标"
                    ></v-text-field>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="info" text @click="createNewType">创建</v-btn>
                    <v-btn @click="newTypeDialog = false" text>
                        取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
                v-model="updateTypeDialog"
                max-width="350"
                persistent
        >
            <v-card>
                <v-card-title>修改类型</v-card-title>
                <v-card-title>
                    <v-text-field v-model="updateType.name"
                                  placeholder="请输入类型名称"
                                  label="类型"
                    ></v-text-field>
                    <v-text-field v-model="updateType.icon"
                                  :append-icon="updateType.icon"
                                  placeholder="请输入类型图标"
                                  label="图标"
                    ></v-text-field>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="info" text @click="updateTemplateType">保存</v-btn>
                    <v-btn @click="updateTypeDialog = false" text>
                        取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import api from '@/api';
    import {modal} from '@/utils';
    import {consts} from "../../utils";

    export default {
        props: {
            projectId: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                updateTypeDialog: false,
                updateType: {},
                newTypeDialog: false,
                newType: {
                    name: '',
                    icon: ''
                },
                typeList: [],

            }
        },
        created() {
            this.getTemplateTypeList();
        },
        methods: {
            createNewType() {
                api.projectSetting.type.create(this.projectId, this.newType, list => {
                    this.typeList = [...list];
                    this.newType = {
                        name: '',
                        icon: ''
                    };
                    this.newTypeDialog = false;
                });
            },
            showUpdateDialog(type){
                this.updateType = consts.objectCopy(type);
                this.updateTypeDialog = true;
            },


            getTemplateTypeList() {
                api.projectSetting.type.getList(this.projectId, list => {
                    this.typeList = [...list];
                });
            },
            updateTemplateType(){
                api.projectSetting.type.update(this.updateType, list=>{
                    this.typeList = [...list];
                    this.updateTypeDialog = false;
                });
            },
            deleteTemplateType(type) {
                modal.confirm({
                    content: `确认删除类型: ${type.name}?`,
                    callback: () => {
                        api.projectSetting.type.delete(type, list => {
                            this.typeList = [...list];
                            modal.dismiss();
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>

<template>
    <v-container fluid>
        <v-list style="background: transparent">
            <template
                    v-for="role in roleList"
            >
                <v-list-item :key="role.id">
                    <v-list-item-icon>
                        <v-icon>{{role.logo}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{role.name}}
                        </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content>
                        {{role.project_mgr+'' === '1'? '项目管理': ''}}
                        {{role.project_mgr+'' === '1'? '，': ''}}
                        {{role.sprint_mgr+'' === '1'? '冲刺管理': ''}}
                        {{role.sprint_mgr+'' === '1'? '，': ''}}
                        {{role.task_mgr+'' === '1'? '任务管理': ''}}
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn small text color="info" @click="showUpdateRoleDialog(role)">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </v-list-item-action>
                    <v-list-item-action>
                        <v-btn small text color="error" @click="deleteRole(role)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
                <v-divider :key="'divider:'+role.id"></v-divider>
            </template>
        </v-list>
        <v-btn
                dark
                color="success"
                absolute
                top
                right
                @click="newRoleDialog = true"
        >
            <v-icon>add</v-icon>
            新角色
        </v-btn>

        <v-dialog
                v-model="newRoleDialog"
                max-width="350"
                persistent
        >
            <v-card>
                <v-card-title>创建角色</v-card-title>
                <v-card-text>
                    <v-text-field
                            v-model="newRole.name"
                            placeholder="请输入角色名称"
                            label="角色"
                    ></v-text-field>
                    <v-text-field
                        v-model="newRole.logo"
                        :append-outer-icon="newRole.icon"
                        label="图标"
                        placeholder="请输入角色图标"
                    ></v-text-field>
                    <v-switch
                            v-model="newRole.project_mgr"
                            :true-value="1"
                            :false-value="0"
                            label="项目管理"
                    ></v-switch>
                    <v-switch
                            v-model="newRole.sprint_mgr"
                            :true-value="1"
                            :false-value="0"
                            label="冲刺管理"
                    ></v-switch>
                     <v-switch
                            v-model="newRole.task_mgr"
                            :true-value="1"
                            :false-value="0"
                            label="任务管理"
                    ></v-switch>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text small color="success" @click="createRoleChange">创建</v-btn>
                    <v-btn text small @click="newRoleDialog = false">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
                v-model="updateRoleDialog"
                max-width="350"
                persistent
        >
            <v-card>
                <v-card-title>角色</v-card-title>
                <v-card-text>
                    <v-text-field
                            v-model="updateRole.name"
                            placeholder="请输入角色名称"
                            label="角色"
                    ></v-text-field>
                    <v-text-field
                        v-model="updateRole.logo"
                        :append-outer-icon="updateRole.icon"
                        label="图标"
                        placeholder="请输入角色图标"
                    ></v-text-field>
                    <v-switch
                            v-model="updateRole.project_mgr"
                            :true-value="1"
                            :false-value="0"
                            label="项目管理"
                    ></v-switch>
                    <v-switch
                            v-model="updateRole.sprint_mgr"
                            :true-value="1"
                            :false-value="0"
                            label="冲刺管理"
                    ></v-switch>
                     <v-switch
                            v-model="updateRole.task_mgr"
                            :true-value="1"
                            :false-value="0"
                            label="任务管理"
                    ></v-switch>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text small color="info" @click="updateRoleChange">保存</v-btn>
                    <v-btn text small @click="updateRoleDialog = false">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import api from '@/api';
    import {consts, modal} from '@/utils';
    export default {
        name: "admin-template-roles",
        props: {
            templateId: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                roleList: [],
                newRoleDialog: false,
                newRole: {
                    name: '',
                    logo: '',
                    project_mgr: 0,
                    sprint_mgr: 0,
                    task_mgr: 0,
                },
                updateRoleDialog: false,
                updateRole: {}
            }
        },
        created() {
            this.getTemplateRoles();
        },
        methods: {
            getTemplateRoles() {
                api.template.role.getList(this.templateId, roleList => {
                    this.roleList = roleList;
                })
            },
            showUpdateRoleDialog(role){
                this.updateRole = consts.objectCopy(role);
                this.updateRoleDialog = true
            },
            updateRoleChange(){
                api.template.role.update(this.updateRole, list=>{
                    this.roleList = list;
                    this.updateRoleDialog = false;
                });
            },
            createRoleChange(){
                api.template.role.create(this.templateId, this.newRole, list=>{
                    this.roleList = list;
                    this.newRole = {
                        name: '',
                        logo: '',
                        project_mgr: 0,
                        sprint_mgr: 0,
                        task_mgr: 0,
                    };
                    this.newRoleDialog = false;
                });
            },
            deleteRole(role){
                modal.confirm({
                    content: `确认删除角色:${role.name}?`,
                    ok:{
                        text: '删除',
                        color: 'error'
                    },
                    callback: ()=>{
                        api.template.role.delete(role, list=>{
                            this.roleList = list;
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

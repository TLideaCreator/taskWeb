<template>
    <v-card class="ma-2">
        <v-card-title>{{roleItem.name}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-layout justify-space-between>
                <v-switch v-model="roleItem.project_mgr"
                          color="primary"
                          :true-value="1"
                          :false-value="0"
                          label="管理项目"></v-switch>
                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <v-icon color="primary" dark v-on="on">help</v-icon>
                    </template>
                    <span>角色将有管理项目的权限，包括修改项目详情，项目设置等</span>
                </v-tooltip>
            </v-layout>
            <v-layout justify-space-between>
                <v-switch v-model="roleItem.sprint_mgr"
                          color="primary"
                          :true-value="1"
                          :false-value="0"
                          label="管理冲刺"></v-switch>
                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <v-icon color="primary" dark v-on="on">help</v-icon>
                    </template>
                    <span>角色将有管理冲刺的权限，创建以及开始/结束冲刺</span>
                </v-tooltip>
            </v-layout>
            <v-layout justify-space-between>
                <v-switch v-model="roleItem.task_mgr"
                          color="primary"
                          :true-value="1"
                          :false-value="0"
                          label="管理任务"></v-switch>
                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <v-icon color="primary" dark v-on="on">help</v-icon>
                    </template>
                    <span>角色将有管理任务的权限，包括创建/修改/删除</span>
                </v-tooltip>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "role-card",
        props: {
            role: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                roleItem: this.role
            }
        },
        watch: {
            role(val) {
                this.roleItem = val
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <v-flex xs12 sm6 md4 lg3>
        <v-card class="ma-2">
            <v-card-title>{{roleItem.name}} <v-icon>{{roleItem.logo}}</v-icon></v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-layout justify-space-between>
                    <v-checkbox v-model="roleItem.project_mgr" :true-value="1" :false-value="0"
                                label="管理项目"></v-checkbox>
                    <v-tooltip right>
                        <template v-slot:activator="{ on }">
                            <v-icon color="primary" dark v-on="on">help</v-icon>
                        </template>
                        <span>角色将有管理项目的权限，包括</span>
                    </v-tooltip>
                </v-layout>
                <v-layout justify-space-between>
                    <v-checkbox v-model="roleItem.sprint_mgr" :true-value="1" :false-value="0"
                                label="管理冲刺"></v-checkbox>
                    <v-tooltip right>
                        <template v-slot:activator="{ on }">
                            <v-icon color="primary" dark v-on="on">help</v-icon>
                        </template>
                        <span>角色将有管理项目的权限，包括</span>
                    </v-tooltip>
                </v-layout>
                <v-layout justify-space-between>
                    <v-checkbox v-model="roleItem.task_mgr" :true-value="1" :false-value="0" label="管理任务"></v-checkbox>
                    <v-tooltip right>
                        <template v-slot:activator="{ on }">
                            <v-icon color="primary" dark v-on="on">help</v-icon>
                        </template>
                        <span>角色将有管理项目的权限，包括</span>
                    </v-tooltip>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-flex>
</template>

<script>
    export default {
        name: "role-card",
        props:{
            role:{
                type:Object,
                default: ()=>{
                    return {}
                }
            }
        },
        data(){
            return {
                roleItem: this.role
            }
        },
        watch:{
            role(val){
                this.roleItem = val
            }
        }
    }
</script>

<style scoped>

</style>
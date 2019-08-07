<template>
    <v-container fluid>
        <v-list>
            <template v-for="(user, index) in userList">
                <v-list-item :key="user.id">
                    <v-list-item-avatar>
                        <v-avatar >
                            <v-img></v-img>
                        </v-avatar>
                    </v-list-item-avatar>
                </v-list-item>
                <v-divider :key="index"></v-divider>
            </template>
        </v-list>
        <v-dialog v-model="createNewUser" fullscreen>
            <template v-slot:activator="{on}">
                <v-btn
                        absolute
                        dark
                        top
                        right
                        color="success"
                        v-on="on"
                >
                    <v-icon>add</v-icon>新模板
                </v-btn>
            </template>
            <v-layout fill-height column style="background-color: white; padding:20px">
                <v-btn
                        fab
                        small
                        @click="createNewUser=false"
                >
                    <v-icon>close</v-icon>
                </v-btn>
                <v-layout fill-height>

                </v-layout>
            </v-layout>
        </v-dialog>
    </v-container>
</template>

<script>
    import api from '@/api';

    export default {
        name: "admin-board-user",
        data() {
            return {
                userList: [],
                createNewUser: false
            }
        },
        created() {
            this.getUserList();
        },
        methods: {
            getUserList() {
                api.system.users.getList(null,userList => {
                    this.userList = userList;
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~@/assets/style/constants.less";
    @import "~@/assets/style/common.less";
</style>

<template>
    <v-container fluid ref="contentLayout">
        <v-layout column>
            <v-layout row justify-space-between align-center class="ml-5 mr-5">
                <v-text-field
                        placeholder="请输入项目名称"
                        v-model="searchKey"
                        append-outer-icon="search"
                        @click:append-outer="searchAction"
                ></v-text-field>
                <v-btn color="success" class="ml-4" @click="createNewUser=false">
                    <v-icon>add</v-icon>
                    新用户
                </v-btn>
                <v-flex md5>
                    <v-pagination
                            v-show="pageLength>1"
                            v-model="currentPage"
                            circle
                            :total-visible="4"
                            :length="pageLength"
                            @input="getUserList"
                            @next="getUserList"
                            @previous="getUserList"
                    ></v-pagination>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-list style="background: transparent">
                <template v-for="(user, index) in userList">
                    <v-list-item :key="user.id">
                        <v-list-item-avatar>
                            <v-avatar>
                                <v-img :src="loadUserAvatar(user)"></v-img>
                            </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{user.name}}</v-list-item-title>
                            <v-list-item-subtitle>
                                <v-icon :size="16">smartphone</v-icon>
                                &nbsp;手机:&nbsp;{{user.phone}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <v-icon :size="16">email</v-icon>
                                &nbsp;E-mail:&nbsp;{{user.email}}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon color="info">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </v-list-item-action>
                        <v-list-item-action>
                            <v-btn icon color="error">
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                    <v-divider :key="index"></v-divider>
                </template>
            </v-list>

        </v-layout>
        <v-dialog v-model="createNewUser" fullscreen>
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
                searchKey: '',
                currentPage: 1,
                pageLength: 0,
                createNewUser: false,
                pageCount: 0
            }
        },
        mounted() {
            let count = Math.floor((this.$refs.contentLayout.clientHeight - 94) / 80);
            this.pageCount = count > 8 ? count : 8;
            this.getUserList();
        },
        methods: {
            loadUserAvatar(userInfo) {
                return this.$store.getters.avatarUrl(userInfo)
            },
            searchAction() {
                this.currentPage = 1;
                this.getUserList();
            },
            getUserList() {
                let data = {
                    searchKey: this.searchKey,
                    page: this.currentPage,
                    per_page: this.pageCount
                };
                api.system.users.getList(data, (userList, meta) => {
                    this.userList = userList;
                    this.pageLength = Math.ceil(meta.total / this.pageCount)
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~@/assets/style/constants.less";
    @import "~@/assets/style/common.less";
</style>

<template>
    <v-app>
        <v-progress-linear
                :color="loading.color"
                striped
                :height="8"
                v-show="loadingFlag"
                v-model="loading.value"
                :indeterminate="loading.query"
                :query="loading.query"
                class="progressStyle"
        ></v-progress-linear>
        <v-alert
                v-model="alertFlag"
                dismissible
                :type="notice.type"
                class="noticeStyle"
        >
            {{ notice.msg }}
        </v-alert>
        <v-snackbar right bottom
                    :color="toast.color"
                    v-model="toastFlag"
                    :timeout="3500"
        >
            {{toast.msg}}
        </v-snackbar>
        <v-app-bar app v-if="!isUserLogin">
            <v-spacer></v-spacer>
            <v-avatar>
                <img src="../assets/images/logo.png" style="width: 32px ; height: 32px"/>
            </v-avatar>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-app-bar app dark clipped-left color="blue accent-2" v-else>
            <v-avatar :size="32">
                <img :src="require('../assets/images/logo.png')" alt="avatar">
            </v-avatar>
            <span class="titleStyle">优序</span>
            <v-btn text small
                   class="ml-4"
                   :replace="true"
                   :to="{name: 'userProjectPage'}"
            >我的项目
            </v-btn>
            <v-text-field class="ml-4 mt-3"></v-text-field>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn text icon v-on="on"
                           :replace="true"
                           small
                           class="mr-4"
                           :to="{name: 'adminBoardPage'}"
                           v-show="isAdmin">
                        <v-icon>view_comfy</v-icon>
                    </v-btn>
                </template>
                <span>管理员面板</span>
            </v-tooltip>
            <v-menu offset-y bottom left>
                <template v-slot:activator="{on}">
                    <v-avatar :size="36"
                              v-on="on"
                    >
                        <img :src="avatarUrl"/>
                    </v-avatar>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-content>个人设置</v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="logoutDialog = true">
                        <v-list-item-content>退出登录</v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-navigation-drawer
            app
            clipped
            :mini-variant="mini"
            v-model="drawer"
        >
            <v-list shaped>
                <v-list-item
                        v-for="(menu, index) in menus"
                        :key="index"
                        :replace="true"
                        :to="{name:menu.path, param:menu.params}"
                >
                    <v-list-item-icon>
                        <v-icon>{{menu.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{menu.title}}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <v-btn style="width: 100%" text @click="mini = !mini">
                    <v-icon>{{mini? 'keyboard_arrow_left': 'keyboard_arrow_right'}}</v-icon>
                    {{mini ? '': '收起'}}
                </v-btn>
            </template>
        </v-navigation-drawer>
        <v-content>
            <v-container
                    fluid
                    fill-height
            >
                <v-layout column>
                    <v-breadcrumbs></v-breadcrumbs>
                    <v-divider></v-divider>
                    <router-view></router-view>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer app v-show="!isUserLogin">
            <v-layout align-center justify-center row text-xs-center>
                ©️Tommy Lee
            </v-layout>
        </v-footer>
        <v-dialog v-model="logoutDialog" persistent max-width="290">
            <v-card>
                <v-card-title>提示</v-card-title>
                <v-card-text>点击确认退出登录</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="grey darken-1" @click="logoutDialog = false">取消</v-btn>
                    <v-btn text color="primary" @click="logout">确认</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>

</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        created() {
            this.init();
        },
        data(){
            return {
                logoutDialog: false,
                mini: false,
            }
        },
        computed: {
            drawer:{
                get(){
                    return this.menus.length > 0;
                }
            },
            menus(){
                return this.$store.getters['getMenuList'];
            },
            alertFlag: {
                set(val) {
                    this.$store.commit('updateAlertFlag', val)
                },
                get() {
                    return this.$store.state.alertFlag;
                }
            },

            toastFlag: {
                set(val) {
                    this.$store.commit('updateToastFlag', val)
                },
                get() {
                    return this.$store.state.toastFlag;
                }
            },
            loadingFlag: {
                set(val) {
                    this.$store.commit('updateLoadingFlag', val)
                },
                get() {
                    return this.$store.state.loadingFlag;
                }
            },
            ...mapGetters([
                'isAdmin',
                'isUserLogin',
                'avatarUrl',
                'toast',
                'notice',
                'loading'
            ])
        },
        methods: {
            ...mapActions([
                'init',
            ]),
            gotoAdminDash() {

            },
            logout() {

            }
        }
    }
</script>

<style lang="less" scoped>
    .progressStyle {
        position: absolute;
        z-index: 99;
        margin: 0;
        top: 56px
    }

    .noticeStyle {
        position: absolute;
        z-index: 999;
        right: 0;
        top: 64px;
        min-width: 40%
    }

    .titleStyle {
        font-size: 20px;
        font-weight: 900;
        padding-left: 10px
    }
</style>

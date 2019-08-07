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
                        <v-list-item-icon>
                            <v-icon>
                                person
                            </v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item @click="logout">
                        <v-list-item-content>退出登录</v-list-item-content>
                        <v-list-item-icon>
                            <v-icon>
                                exit_to_app
                            </v-icon>
                        </v-list-item-icon>
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
                        :to="{name:menu.path}"
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
                    <v-breadcrumbs :items="pathItems">
                        <template v-slot:divider>
                            <v-icon>chevron_right</v-icon>
                        </template>
                    </v-breadcrumbs>
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
        <v-dialog v-model="modalFlag"
            max-width="350"
        >
            <v-card>
                <v-card-title>
                    {{modal.title|modalTitle}}
                </v-card-title>
                <v-card-text>
                    {{modal.content}}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text :color="actionBtnColor" @click="modalClick">
                        {{modal|actionBtnText}}
                    </v-btn>
                    <v-btn text @click="modalFlag = false">
                        {{modal|cancelBtnText}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import {consts,modal} from "@/utils";

    export default {
        created() {
            this.init();
        },
        data(){
            return {
                mini: false,
            }
        },
        computed: {
            drawer:{
                get(){
                    return this.menus.length > 0;
                },
                set(){
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
            modalFlag: {
                set(val) {
                    this.$store.commit('updateModalFlag', val)
                },
                get() {
                    return this.$store.state.modalFlag;
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
            actionBtnColor(){
                if(!this.modal || !this.modal.ok || !this.modal.ok.color){
                    return 'info'
                }
                return this.modal.ok.color
            },
            ...mapGetters([
                'isAdmin',
                'isUserLogin',
                'avatarUrl',
                'toast',
                'notice',
                'loading',
                'modal',
                'pathItems'
            ])
        },
        filters: {
            modalTitle(title){
                if(consts.stringIsEmptyWithTrim(title)){
                    return '提示';
                }
                return title;
            },

            actionBtnText(modal){
                if(!modal || !modal.ok || consts.stringIsEmptyWithTrim(modal.ok.text)){
                    return '确定'
                }
                return modal.ok.text
            },
            cancelBtnText(modal){
                if(!modal || !modal.cancel || consts.stringIsEmptyWithTrim(modal.cancel.text)){
                    return '取消'
                }
                return modal.cancel.text
            }
        },
        methods: {
            ...mapActions([
                'init',
            ]),
            gotoAdminDash() {

            },
            logout() {
                modal.confirm({
                    content:'确认退出?',
                    ok:{
                        text: '退出',
                        color: 'error'
                    },
                    callback: ()=>{
                        modal.dismiss();
                    }
                })
            },
            modalClick(){
                if(this.modal.callback){
                    this.modal.callback();
                }
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

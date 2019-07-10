<template>
    <v-app>
        <v-toolbar app>
            <v-spacer></v-spacer>
            <v-avatar>
                <img src="./assets/images/logo.png" style="width: 32px ; height: 32px"/>
            </v-avatar>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-content app>
            <v-layout fill-height
                      justify-center align-center>
                <v-flex md4 lg3>
                    <h1>有序</h1>
                    <h2>开源任务管理系统</h2>
                    <h3>有序是基于Vue-js以及Lumen框架开发的开源任务管理系统，包含敏捷模式模板，支持自定义模板。</h3>
                    <h2>登录开始体验</h2>
                </v-flex>
                <v-flex md1></v-flex>
                <v-flex md4 lg3>
                    <v-card align-center
                            justify-center>
                        <v-layout column slot="default"
                                  style="padding: 20px 40px;">
                            <h1 style="text-align: center;padding: 10px;">有序</h1>
                            <v-text-field
                                    v-model="loginName"
                                    :rules="[filedRule.required, filedRule.acctMatch]"
                                    label="手机号/邮箱"
                                    prepend-icon="assignment_ind"
                            ></v-text-field>
                            <v-text-field
                                    v-model="passwd"
                                    label="密码"
                                    prepend-icon="lock"
                                    :append-icon=" showPwd? 'visibility' : 'visibility_off'"
                                    :type="showPwd ? 'text' : 'password'"
                                    :rules="[filedRule.required, filedRule.pwdMatch]"
                                    @click:append="showPwd = !showPwd"
                            ></v-text-field>
                            <v-btn color="info" @click="handleSubmit()" :disabled="!acctCheck || !pwdCheck">登录</v-btn>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-content>
        <v-footer app >
            <v-layout align-center justify-center row>
                <v-flex text-xs-center xs12>
                    ©️Tommy Lee
                </v-flex>
            </v-layout>
        </v-footer>
    </v-app>

</template>

<script>
    import store from './store/store'
    import {mapActions, mapGetters} from 'vuex';
    import {consts} from "../../utils";

    export default {
        name: 'login-page',
        store,
        data(){
            return {
                showPwd: false,
                acctCheck: false,
                pwdCheck: false,
                filedRule:{
                    required: value => !!value || '必填',
                    acctMatch: (v) =>{
                        this.acctCheck =consts.matchPhone(v) || consts.matchEmail(v) ;
                        return this.acctCheck || '请输入正确的手机号或者邮箱'
                    },
                    pwdMatch: (val) => {
                        this.pwdCheck = val && val.length >=6;
                        return this.pwdCheck || '密码长度最少六位'
                    }

                }
            }
        },
        computed: {
            loginName: {
                set(val) {
                    store.commit('formItemLoginName', val);
                },
                get() {
                    return store.state.formItem.loginName;
                },
            },
            passwd: {
                set(val) {
                    store.commit('formItemPasswd', val);
                },
                get() {
                    return store.state.formItem.passwd;
                },
            },
            ...mapGetters({
                formItem: 'formItem',
                ruleValidate: 'ruleValidate'
            })
        },
        methods: {
            ...mapActions([
                'handleSubmit',
                'resetLoginInfo'
            ])
        }
    }
</script>

<style scoped lang="less" src="./assets/style/css.less">

</style>

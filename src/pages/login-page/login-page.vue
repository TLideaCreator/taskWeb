<template>
    <v-app>
        <v-toolbar app>
            <v-spacer></v-spacer>
            <v-avatar>
                <img src="/favicon.icon"/>
            </v-avatar>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-content app>
            <v-layout fill-height
                      justify-space-around align-center>
                <v-flex md4 >
                    <h1>有序</h1>
                    <h2>开源任务管理系统</h2>
                    <h3><span style="font-weight: bold">有序</span>是基于Vue-js以及Lumen框架开发的开源任务管理系统，包含敏捷模式模板，支持自定义模板。</h3>
                </v-flex>
                <v-flex md4 >
                    <v-card align-center
                            justify-center>
                        <v-layout column slot="default"
                                  style="padding: 20px 40px;">
                            <h1 style="text-align: center;padding: 10px;">有序</h1>
                            <v-text-field
                                    label="手机号/邮箱"
                                    prepend-icon="assignment_ind"
                            ></v-text-field>
                            <v-text-field
                                    label="密码"
                                    prepend-icon="lock"
                            ></v-text-field>
                            <v-btn color="info" @click="handleSubmit()">登录</v-btn>
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

    export default {
        name: 'login-page',
        store,
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

<template>
            <v-layout fill-height
                      justify-center align-center>
                <v-flex md4 lg3>
                    <h1>优序</h1>
                    <h2>开源任务管理系统</h2>
                    <h3>优序是基于Vue-js以及Lumen框架开发的开源任务管理系统，包含敏捷模式模板，支持自定义模板。</h3>
                    <h2>登录开始体验</h2>
                </v-flex>
                <v-flex md1></v-flex>
                <v-flex md4 lg3>
                    <v-card align-center
                            justify-center>
                        <v-layout column slot="default"
                                  style="padding: 20px 40px;">
                            <h1 style="text-align: center;padding: 10px;">优序</h1>
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
</template>

<script lang="js" src="./login-page.js">

</script>

<style scoped lang="less" src="./assets/style/css.less">

</style>

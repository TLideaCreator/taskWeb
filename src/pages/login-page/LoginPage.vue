<template>
    <v-layout row justify-center align-center fill-height>
        <div class="card">
            <h3 class="cardTitle mb-3">欢迎使用任务看板</h3>
            <v-text-field
                    v-model="acct"
                    label="账号"
                    placeholder="请输入手机号/电子邮件"
                    prepend-inner-icon="person"
            ></v-text-field>
            <v-text-field
                    v-model="pwd"
                    label="密码"
                    placeholder="请输入密码"
                    prepend-inner-icon="lock"
                    :append-icon="showPwd ? 'visibility' : 'visibility_off'"
                    :type="showPwd ? 'text':'password'"
                    @click:append="showPwd = !showPwd"
            ></v-text-field>
            <v-layout row justify-center align-center>
                <v-btn color="primary" @click="submit">登录</v-btn>
            </v-layout>
        </div>
    </v-layout>
</template>

<script src="./login-page.js">
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>
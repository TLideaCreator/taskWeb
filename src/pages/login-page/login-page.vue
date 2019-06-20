<template>
    <div class="login">
        <Layout>
            <Card dis-hover class="ivu_login_card">
                <p slot="title" style="text-align: center">登录</p>
                <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="60">
                    <FormItem label="账号" prop="loginName">
                        <Input type="text" v-model="loginName" placeholder="请输入账号..." class="ivu_login_input"/>
                    </FormItem>
                    <FormItem label="密码" prop="passwd">
                        <Input type="password" v-model="passwd" placeholder="请输入密码..." class="ivu_login_input" @on-enter="handleSubmit($refs['formItem'])" />
                    </FormItem>
                    <FormItem :label-width="0">
                        <Button  type="primary"  @click="handleSubmit($refs['formItem'])" class="ivu_login_btn" long>登录</Button>
                    </FormItem>
                </Form>
            </Card>
        </Layout>
    </div>
</template>

<script>
    import store from './store/store'
    import { mapActions, mapGetters } from 'vuex';
    export default {
        name: 'login-page',
        store,
        computed:{
            loginName:{
                set(val){
                    store.commit('formItemLoginName',val);
                },
                get(){
                    return store.state.formItem.loginName;
                },
            },
            passwd:{
                set(val){
                    store.commit('formItemPasswd',val);
                },
                get(){
                    return store.state.formItem.passwd;
                },
            },
            ...mapGetters({
                formItem:'formItem',
                ruleValidate: 'ruleValidate'
            })
        },
        methods:{
            ...mapActions([
                'handleSubmit',
                'resetLoginInfo'
            ])
        }
}
</script>

<style scoped lang="less" src="./assets/style/css.less">

</style>

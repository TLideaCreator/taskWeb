<template>
    <Layout style="height: 100%; background: transparent">
        <Button style="position: fixed; top:30px;left:30px" shape="circle" icon="md-close" size="large"
                @click="cancelEvent"></Button>
        <Row type="flex" justify="space-around" align="middle" style="height: 100%">
            <Col :span="8" v-show="!showAvatar">
                <h3 class="textCenter">为任务看板新建用户</h3>
                <Row type="flex" justify="center" align="middle">
                    <img :src="require('../assets/images/user-profile.png')" class="imageClass"/>
                </Row>
                <h3 style="color:#ff4e3d" class="textCenter">新建用户密码默认为手机号后六位</h3>
            </Col>
            <Col :span="8" v-show="showAvatar">
                <img
                        v-for="index of 30"
                        :key="index"
                        class="avatarList"
                        :src="require('../../../../assets/images/avatar/'+index+'.png')"
                        @click="updateAvatar(index)"
                />
            </Col>
            <Col :span="6">
                <h2 class="textCenter" style="margin-bottom: 20px">创建用户</h2>
                <div class="centerDiv">
                    <Button type="text" @click="showAvatar =! showAvatar">
                        <img class="avatarImg" :src="require('../../../../assets/images/avatar/'+userInfo.avatar+'.png')"/>
                    </Button>
                </div>

                <Form :model="userInfo" :rules="userInfoValidRule" ref="userInfo" :label-width="60">
                    <FormItem label="姓名" prop="name">
                        <Input v-model="userInfo.name"/>
                    </FormItem>
                    <FormItem label="手机" prop="phone">
                        <Input v-model="userInfo.phone"/>
                    </FormItem>
                    <FormItem label="邮箱" prop="email">
                        <Input v-model="userInfo.email"/>
                    </FormItem>
                    <FormItem >
                        <Checkbox v-model="userInfo.isAdmin"
                                  true-value="1"
                                  false-value="0">设置为管理员</Checkbox>
                    </FormItem>
                </Form>
                <Row type="flex" justify="center">
                    <Col :span="12" :push="2">
                        <Button type="primary"
                                style="width: 100%"
                                @click="createUser"

                        >创建
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Layout>
</template>

<script>
    import {consts} from "@/utils";
    import api from '@/api';
    export default {
        name: "user-create",
        data() {
            return {
                showAvatar: false,
                userInfo: {
                    name: '',
                    phone: '',
                    email: '',
                    isAdmin: '0',
                    avatar: '1'
                }
            };
        },
        computed: {
            userInfoValidRule() {
                return {
                    name: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {
                            validator(rule, value, callback) {
                                if (!consts.matchPhone(value)) {
                                    callback('请填写正确手机号码');
                                }else{
                                    callback([]);
                                }
                            }
                        }
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {
                            validator(rule, value, callback) {
                                if (!consts.matchEmail(value)) {
                                    callback('请填写正确的邮箱');
                                }else{
                                    callback([]);
                                }
                            }
                        }
                    ],
                }
            }
        },
        methods: {
            createUser() {
                this.$refs.userInfo.validate((valid) => {
                    if (valid) {
                        this.userInfo.pwd = this.userInfo.phone.substr(-6, 6);
                        api.user.createUserApi(this.userInfo,
                            () => {
                                this.$refs.userInfo.resetFields();
                                this.$emit('closeModal', true);
                            });
                    }
                });
            },
            cancelEvent() {
                this.$refs.userInfo.resetFields();
                this.$emit('closeModal', false);
            },
            updateAvatar(index){
                this.showAvatar = false;
                this.userInfo.avatar = index+'';
            }
        }
    }
</script>

<style scoped lang="less">
    .imageClass {
        width: 180px;
        height: 180px;
        margin: 20px 0
    }
    .centerDiv{
        margin: 20px 10px;
        display: flex;
        justify-content: center;
        justify-items: center;
        align-items: center;
        align-content: center;
    }
    .avatarList{
        width: 45px;
        height: 45px;
        margin: 10px;
    }
    .avatarImg {
        width: 60px;
        height: 60px;
    }
</style>

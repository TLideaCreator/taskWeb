<template>
    <div class="createProjectStep2Style">
        <h3 class="titleText">请选择项目参与人员，以及分配角色</h3>
        <RowTitle
                :rowList="titleList"
        ></RowTitle>
        <Scroll :height="300" style="background: white;margin-bottom: 10px">
            <Row class="memberRow" type="flex" justify="start" align="middle" v-for="member in memberList"
                 :key="member.user_id">
                <Col :span="6">{{member.name}}</Col>
                <Col :span="6">{{member.phone}}</Col>
                <Col :span="6">{{member.email}}</Col>
                <Col :span="6">
                    <Select @on-change="selectChanged($event, member)"
                            :prefix="getRoleIcon(member.role_id)"
                            :value="member.role_id ? member.role_id:'-1'" >
                        <Option v-for="(role) in roleList" :key="role.id" :value="role.id">
                            {{role.name}}
                        </Option>
                    </Select>
                </Col>
            </Row>
        </Scroll>
        <Row type="flex" justify="end" align="middle">
            <Button type="text" @click="skip"><u>跳过</u></Button>
            <Col :span="1"></Col>
            <Button type="primary" @click="skip">完成</Button>
        </Row>
    </div>
</template>

<script>
    import RowTitle from "@/components/RowTitle";
    import {consts} from '@/utils'
    import api from '@/api'
    export default {
        name: "create-project-step1",
        components: {RowTitle},
        props: {
            pid: {
                type: String,
                default: ''
            }
        },
        computed: {
            titleList() {
                return [
                    {span: 6, name: '姓名'},
                    {span: 6, name: '手机'},
                    {span: 6, name: '邮箱'},
                    {span: 6, name: '角色'}
                ]
            },
            roleList(){
                return [
                    {
                        id: '-1',
                        name: '未分配'
                    },
                    ...this.memberRoleList
                ]
            }
        },
        data() {
            return {
                projectId: this.pid,
                memberList: [],
                memberRoleList: []
            }
        },
        watch: {
            pid(val) {
                this.projectId = val;
                if (!consts.stringIsEmptyWithTrim(val)) {
                    this.loadProjectMembers();
                }
            }
        },
        methods: {
            getRoleIcon(roleId) {
                let icon = '';
                switch(roleId){
                    case '1': icon='md-person'; break;
                    case '2': icon='md-git-network';break;
                    case '3': icon='md-flash'; break;
                    case '4':icon='md-eye'; break;
                    default: break;
                }
                return icon;
            },
            resetVar() {
                this.memberList = [];
            },
            skip() {
                this.$emit('finish');
            },
            loadProjectMembers() {
                api.projectSetting.getProjectMemberList(
                    this.projectId,
                    (members, roles) => {
                        this.memberList = members;
                        this.memberRoleList = roles;
                    }
                );
            },
            selectChanged(roleId, member) {
                if (roleId === '-1') {
                    api.projectSetting.deleteProjectMember(this.projectId, member.user_id, (members, roles) => {
                        this.memberList = members;
                        this.memberRoleList = roles;
                    });
                } else {
                   api.projectSetting.updateProjectMemberRole(this.projectId, member.user_id, roleId, (members, roles) => {
                       this.memberList = members;
                       this.memberRoleList = roles;
                   })
                }
            }
        }
    }
</script>

<style scoped>
    .createProjectStep2Style {
        width: 600px !important;
        height: 500px;
    }

    .titleText {
        text-align: center;
        margin: 10px 0;
    }

    .memberRow {
        height: 44px
    }
</style>

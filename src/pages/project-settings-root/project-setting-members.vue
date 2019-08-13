<template>
    <v-list>
        <template v-for="member of memberList">
            <v-list-item
                    :key="member.user_id"
            >
                <v-list-item-avatar>
                    <v-avatar>
                        <v-img :src="loadUserAvatar(member)"></v-img>
                    </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>
                        {{member.name}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        <v-icon>smartphone</v-icon>&nbsp;手机&nbsp;:&nbsp;&nbsp;{{member.phone}}&nbsp;&nbsp;
                        <v-icon>email</v-icon>&nbsp;邮箱&nbsp;:&nbsp;&nbsp;{{member.email}}
                    </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-select
                            v-model="member.role_id"
                            :items="roleList"
                            :prepend-inner-icon="roleIcon[member.role_id]"
                            solo
                            item-value="id"
                            item-text="name"
                            style="width:240px"
                            @change="changeMemberRole(member)"
                    >
                    </v-select>
                </v-list-item-action>
            </v-list-item>
            <v-divider :key="'divider:'+member.user_id"></v-divider>
        </template>
    </v-list>
</template>

<script>
    import api from '@/api';

    export default {
        props: {
            projectId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                memberList: [],
                roleList: []
            }
        },
        created() {
            this.getProjectMemberList();
        },
        computed: {
            roleIcon() {
                let roleIcon = {};
                this.roleList.forEach(item=>{
                    roleIcon[item.id] = item.logo;
                });
                return roleIcon;
            }
        },
        methods: {
            loadUserAvatar(userInfo) {
                return this.$store.getters.avatarUrl(userInfo)
            },

            changeMemberRole(member) {
                if(member.role_id){
                    api.projectSetting.member.updateMemberRole(this.projectId,member.user_id,member.role_id,(memberList, roleList)=>{
                        this.memberList = memberList;
                        this.roleList = [{id: null , name: '未指派', logo: ''},...roleList];
                    })
                }else{
                    api.projectSetting.member.delete(this.projectId,member.user_id,(memberList, roleList)=>{
                        this.memberList = memberList;
                        this.roleList = [{id: null , name: '未指派', logo: ''},...roleList];
                    })
                }

            },
            getProjectMemberList() {
                api.projectSetting.member.getList(this.projectId, (memberList, roleList) => {
                    this.memberList = memberList;
                    this.roleList = [{id: null , name: '未指派', logo: ''},...roleList];
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~@/assets/style/constants.less";
    @import "~@/assets/style/common.less";
</style>

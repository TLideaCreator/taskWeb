<template>

    <Layout :style="fullHeight">
        <HeaderLine
                title="项目人员"
        ></HeaderLine>
        <Layout class="contentLayout">
            <InputPage
                    v-model="searchKey"
                    placeholder="请输入姓名/手机号/email"
            ></InputPage>
            <RowTitle
                    :rowList="titleList"
            ></RowTitle>
            <Content ref="scrollContent">
                <Scroll :height="scrollerHeight">
                    <Row class="memberRow" type="flex" justify="start"
                         align="middle" v-for="member in memberList"
                         style="height: 44px; font-size: 14px;"
                         :key="member.userId">
                        <Col :span="6" style="color: #33b5fc;" v-html="highLight(member.name)"></Col>
                        <Col :span="6" v-html="highLight(member.phone)"></Col>
                        <Col :span="6" v-html="highLight(member.email)"></Col>
                        <Col :span="6">
                            <Select placeholder="未分配"
                                    :prefix="roleIcon(member.role_id)"
                                    :value="member.role_id ? member.role_id:'-1'"
                                    @on-change="memberRoleSelectChanged($event,member)"
                            >
                                <Option v-for="(role , index) in roleList" :key="index" :value="role.id">
                                    {{role.name}}
                                </Option>
                            </Select>
                        </Col>
                    </Row>
                </Scroll>
            </Content>
        </Layout>
    </Layout>
</template>

<script>
    import store from './store/store';
    import {mapGetters} from "vuex";
    import RowTitle from "@/components/RowTitle";
    import {consts} from '@/utils'
    import InputPage from "@/components/InputPage";

    export default {
        name: "project-setting-member-page",
        components: {InputPage, RowTitle},
        store,
        mounted() {
            store.dispatch('initPage', this.$refs.scrollContent.$el.clientHeight)
        },
        computed: {
            searchKey: {
                set(val) {
                    store.commit('updateSearchKey', val)
                },
                get() {
                    return store.state.searchKey
                }
            },

            fullHeight() {
                return consts.contentHeight
            },
            ...mapGetters({
                titleList: 'getTitleList',
                memberList: 'getMemberList',
                scrollerHeight: 'getScrollerHeight',
                roleList: 'getRoleList',
                roleIcon: 'getRoleIcon'
            })
        },
        methods: {
            highLight(content) {
                return consts.highLight(this.searchKey, content)
            },
            memberRoleSelectChanged(roleId, member){
                if(roleId === member.role_id || ('-1' === roleId && member.role_id === null)){
                    return ;
                }
                store.dispatch('memberRoleChanged',{roleId:roleId, member: member})
            },
        }
    }
</script>

<style scoped>

</style>

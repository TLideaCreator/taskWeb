<template>
    <Layout :style="fullHeight">
        <HeaderLine
            title="用户列表"
            btnTitle="创建用户"
            @headerBtnClick="showModal=true"
        ></HeaderLine>
        <Modal v-model="showModal" fullscreen footer-hide :closable="false">
            <UserCreate
                @closeModal="modalChanged"
            ></UserCreate>
        </Modal>
        <Layout class="contentLayout">

            <InputPage
                    v-model="searchKey"
                    placeholder="请输入姓名/手机号/email"
                    @search="queryUserList"
                    :total="totalCount"
                    :perPage="pageCount"
                    @page-changed="changePage"
            ></InputPage>
            <RowTitle style="margin-top: 20px" :rowList="userTitleList"></RowTitle>
            <Content ref="contentDiv">
                <Scroll :height="scrollHeight">
                    <Row class-name="rowItemClass"
                         type="flex" align="middle"
                         v-for="user in userList"
                         :key="user.id"
                    >
                        <Col :span="4">
                            <router-link :to="'/users/'+user.id">
                                {{user.name}}
                            </router-link>
                        </Col>
                        <Col :span="4">{{user.phone}}</Col>
                        <Col :span="6">{{user.email}}</Col>
                        <Col :span="4">{{user.admin | adminMark}}</Col>
                        <Col :span="6">
                            <Row type="flex" justify="center">
                                <Button shape="circle" icon="md-settings" type="primary"></Button>
                            </Row>
                        </Col>
                    </Row>
                </Scroll>
            </Content>
        </Layout>
    </Layout>
</template>

<script>

    import {mapGetters} from "vuex";
    import store from './store/store';
    import RowTitle from "@/components/RowTitle";
    import {consts} from '@/utils'
    import UserCreate from "./component/user-create";
    import InputPage from "@/components/InputPage";


    export default {
        name: 'user-page',
        components: {InputPage, UserCreate, RowTitle},
        store,
        filters: {
            adminMark(val) {
                if (val+'' === 'No') {
                    return '否'
                } else if (val+'' === 'Yes') {
                    return '是'
                }
            }
        },
        data() {
            return {
                scrollHeight: 0,
                searchKey: '',
                showModal: false
            }
        },
        mounted() {
            this.scrollHeight = consts.scrollerHeight(this.$refs.contentDiv.$el.clientHeight);
            store.dispatch('initPage', {contentHeight: this.scrollHeight,searchKey:this.searchKey, page:this.currentPage});
        },
        computed: {
            ...mapGetters({
                userTitleList:'getUserTitleList',
                userList: 'getUserList',
                fullHeight: 'fullHeight',
                pageCount: 'getPageCount',
                totalCount: 'getUserTotalCount',
            })
        },
        methods: {
            modalChanged(needReload){
                this.showModal = false;
                if(needReload){
                    this.queryUserList();
                }
            },
            queryUserList(){
                store.dispatch('loadUserList',{searchKey:this.searchKey, page:1})
            },
            changePage(pageNum){
                store.dispatch('loadUserList',{searchKey:this.searchKey, page:pageNum})
            }
        }
    }
</script>

<style lang="less" scoped src="./assets/style/index.less">

</style>

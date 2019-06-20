<template>
    <Layout :style="fullHeight">
        <HeaderLine
                title="项目列表"
                btnTitle="创建项目"
                @headerBtnClick="showModel = true"
        ></HeaderLine>
        <Modal v-model="showModel" footer-hide fullscreen :closable="false">
            <CreateProject
                    @closeModal="modalChanged"
            ></CreateProject>
        </Modal>
        <Layout class="contentLayout">
            <h5>近期使用</h5>
            <Row type="flex" justify="start" align="middle" class-name="titleRow" :gutter="16">
                <Col :span="5" v-for="project in recentProject" :key="project.projectId">
                    <router-link :to="{name: 'project-group', params:{id:project.id}}">
                        <Card class="cardCss">
                            <div slot="title" class="cardTitle">
                                <img class="projectImg"
                                     :src="require('../../../assets/images/project/'+project.icon+'.png')"/>
                                <h3 style="text-align: center">{{project.name}}</h3>
                            </div>
                            <h4 style="text-align: center">&nbsp;{{project.mgr.data.name}} &nbsp;</h4>
                            <h4 style="text-align: center">{{project.sprintName|sprintName(project.projectName)}}</h4>
                        </Card>
                    </router-link>
                </Col>
            </Row>
            <InputPage
                    v-model="searchKey"
                    @search="resetPageSearch"
                    :total="totalCount"
                    :perPage="pageCount"
                    placeholder="请输入项目名称"
                    @page-changed="changePage"
            ></InputPage>

            <RowTitle :rowList="projectTitleList"></RowTitle>
            <Content class="projectListLayout" ref="contentLayout">
                <Scroll :height="scrollerHeight">
                    <Row class-name="rowItemClass"
                         type="flex" align="middle"
                         v-for="project in projectList"
                         :key="project.projectId">
                        <Col :span="6">
                            <router-link :to="{name:'project-group',params:{id:project.id}}">
                                <div class="projectTitle">
                                    <img class="projectImg"
                                         :src="require('../../../assets/images/project/'+project.icon+'.png')"/>

                                    {{project.name}}
                                </div>
                            </router-link>
                        </Col>
                        <Col :span="6">{{project.mgr.data.name}}</Col>
                        <Col :span="6">{{project.sprintName|sprintName(project.name)}}</Col>
                        <Col :span="6">
                            <Button type="primary" shape="circle" size="small" icon="md-settings"
                                    :to="{name:'project-setting',params:{id:project.id}}">
                            </Button>
                        </Col>
                    </Row>
                </Scroll>
            </Content>
        </Layout>

    </Layout>
</template>

<script>

    import {mapGetters, mapState} from "vuex";
    import store from './store/store';
    import RowTitle from "@/components/RowTitle";
    import CreateProject from "@/components/CreateProject/create-project";
    import {consts} from '@/utils'
    import InputPage from "@/components/InputPage";

    export default {
        name: 'dash-project-page',
        components: {InputPage, RowTitle, CreateProject},
        store,
        data() {
            return {
                scrollerHeight: 0,
                searchKey: '',
                currentPage: 1,
                showModel: false
            }
        },
        filters: {
            projectVisibleFilter(val) {
                if (val + '' === '0') {
                    return '仅自己可见'
                } else if (val + '' === '1') {
                    return '项目参与者可见'
                } else if (val + '' === '2') {
                    return '所有人可见'
                }
            },
            filterProjectCurrentSprint(project) {
                let sprint = '无';
                if (!consts.stringIsEmptyWithTrim(project.sprintId)) {
                    sprint = project.projectName.substr(0, 2) + 'ST' + project.sprintIndex
                }
                return sprint
            }
        },
        mounted() {
            this.scrollerHeight = consts.scrollerHeight(this.$refs.contentLayout.$el.clientHeight);
            store.dispatch('initPage', {
                contentHeight: this.scrollerHeight,
                page: this.currentPage,
                searchKey: this.searchKey
            });
        },
        computed: {
            ...mapState([
                'totalCount',
                'projectList',
                'pageCount'
            ]),
            ...mapGetters({
                projectTitleList: 'getProjectListTitle',
                fullHeight: 'fullHeight',
                recentProject: 'getRecentProject',
            })
        },
        methods: {
            modalChanged(needReload) {
                this.showModel = false;
                if (needReload) {
                    this.resetPageSearch();
                }
            },
            changePage(page) {
                this.currentPage = page;
                store.dispatch('loadProjectList', {page: this.currentPage, searchKey: this.searchKey})
            },
            resetPageSearch() {
                this.currentPage = 1;
                store.dispatch('loadProjectList', {page: this.currentPage, searchKey: this.searchKey})
            },
        }
    }
</script>

<style lang="less" scoped src="./assets/style/index.less">

</style>

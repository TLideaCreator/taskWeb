<template>
    <Layout>
        <Modal v-model="showModel" footer-hide fullscreen :closable="false">
            <CreateProject
                    @closeModal="modalChanged"
            ></CreateProject>
        </Modal>
        <Sider
                :style="fullHeight"
                hide-trigger
                :collapsed-width="0"
                collapsible>
            <Poptip placement="bottom" width="180"
                    v-model="popShow"
                    @on-popper-show="popShow = true"
                    @on-popper-hide="popShow = false"
                    style="margin-bottom: 20px"
            >
                <FunItem :iconSrc="projectIcon"
                         iconType="img"
                         :title="projectInfo.name"
                         :inActive="popShow"
                         signType="more"
                         style="width:180px"></FunItem>
                <Layout slot="content" style="background: white">
                    <Input placeholder="项目名称" style="margin-bottom: 10px" v-model="projectKey"/>
                    <Scroll :height="scrollHeight" style="width: 100%">
                        <ProjectItem
                                v-for="project in recentProjects"
                                :key="project.id"
                                :icon-src="project.icon"
                                :title="project.name"
                                :inActive="projectInfo.id === project.id"
                                @click.native="changeProject(project.id)"
                        ></ProjectItem>
                        <Button size="small" type="text" style="width: 100%; color:deepskyblue; margin-top: 10px"
                                :to="{name: 'project'}">查看全部项目
                        </Button>
                    </Scroll>
                    <Button type="text" @click="showModel = true">
                        <Icon type="md-add"></Icon>
                        创建项目
                    </Button>
                </Layout>
            </Poptip>
            <template v-for="(menuGroup, index) in menuList">
                <h5 :key="index+'title'" v-show="menuGroup.title !== ''" style="margin: 5px; font-weight: 900">
                    {{menuGroup.title}}</h5>
                <fun-item
                        style="margin-bottom: 5px"
                        v-for="menu in menuGroup.menuList"
                        :key="menu.path"
                        :iconSrc="menu.icon"
                        :path="menu.path"
                        :title="menu.title"
                        :inActive="activeName === menu.path"
                        :signType="menu.signType"
                        @click.native="clickToGo(menu.path)"
                ></fun-item>
                <hr :key="index+'hr'" v-show="index !== menuList.length-1" style="margin: 5px 0 10px 0;">
            </template>

        </Sider>
        <Content :style="contentStyle" class="mainLayout">

            <router-view></router-view>
        </Content>
    </Layout>
</template>

<script>
    import {mapGetters, mapState, mapActions} from 'vuex';
    import store from "./store/store";
    import {router} from "@/utils";
    import FunItem from "./components/fun-item";
    import CreateProject from "@/components/CreateProject/create-project";
    import ProjectItem from "./components/project-item";

    export default {
        components: {ProjectItem, CreateProject, FunItem},
        store,
        name: "project-group",
        beforeCreate() {
            store.commit('updateActiveName', router.currentRoute.name);
            store.commit('updateProjectId', router.currentRoute.params.id);
        },
        mounted() {
            store.dispatch('initEvents');
        },
        data() {
            return {
                popShow: false,
                showModel: false,
                projectId: ''
            }
        },
        watch: {
            '$route.path': () => {
                store.commit('updateActiveName', router.currentRoute.name);
            }
        },
        computed: {
            projectKey: {
                get() {
                    return store.state.projectKey
                },
                set(val) {
                    store.commit('updateProjectKey', val);
                }
            },
            scrollHeight() {
                if (this.recentProjects.length < 7) {
                    return 54 * (this.recentProjects.length + 1);
                } else {
                    return 54 * this.recentProjects.length;
                }
            },
            ...mapState([
                'projectInfo',
                'activeName'
            ]),
            ...mapGetters({
                fullHeight: 'getFullHeight',
                contentStyle: 'getContentStyle',
                menuList: 'getMenuList',
                projectIcon: 'getProjectImg',
                recentProjects: 'getRecentProjects'
            })
        },
        methods: {
            modalChanged(projectId) {
                this.showModel = false;
                this.changeProject(projectId);
            },
            changeProject(projectId) {
                this.popShow = false;
                if (projectId) {
                    router.replace({name: 'project-working', params: {id: projectId}});
                    store.commit('updateProjectId', projectId)
                }
            },
            ...mapActions([
                'clickToGo'
            ])
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>

<template>
    <v-layout column fill-height class="contentLayout">
        <v-layout row justify-space-between align-center class="ml-5 mr-5">
            <v-text-field
                placeholder="请输入项目名称"
                v-model="searchKey"
                @keydown="keyDown"
            ></v-text-field>
            <v-dialog v-model="showCreateProject" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{on}">
                    <v-btn color="success" class="ml-4" v-on="on">
                        <v-icon>add</v-icon>
                        新项目
                    </v-btn>
                </template>
                <v-layout fill-height column style="background-color:white; padding:20px">
                    <v-btn icon @click="showCreateProject = false" text>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <ProjectCreatePage
                            @create-success="closeCreateProject"
                    ></ProjectCreatePage>
                </v-layout>
            </v-dialog>
            <v-flex md5>
                <v-pagination
                        v-show="pageLength>1"
                        v-model="currentPage"
                        circle
                        :total-visible="4"
                        :length="pageLength"
                        @input="getMyProjectList"
                        @next="getMyProjectList"
                        @previous="getMyProjectList"
                ></v-pagination>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout fill-height column class="projectListLayout" ref="contentLayout">
            <v-flex md12 max-height="300">
                <v-list class="bgTrans" max-height="300">
                    <template
                            v-for="(project,index) in projectList"
                    >
                        <v-list-item
                                :key="project.id"
                                class="bgTrans"
                                @click="goToProject(project.id)"
                        >
                            <v-list-item-avatar>
                                <v-img :src="getProjectIcon(project)"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{project.name}}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{project.desc}}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-avatar>
                                <v-img :src="getProjectMgrIcon(project.mgr.data)"></v-img>
                            </v-list-item-avatar>
                        </v-list-item>
                        <v-divider
                                :key="index"
                        ></v-divider>
                    </template>
                </v-list>
            </v-flex>
        </v-layout>

    </v-layout>
</template>

<script>
    import api from '@/api';
    import {router} from '@/utils';
    import ProjectCreatePage from "../../components/CreateProject/create-project";

    export default {
        name: 'dash-project-page',
        components: {ProjectCreatePage},
        data() {
            return {
                items: [
                    {
                        text: '我的项目',
                        disabled: false,
                        href: '',
                    }
                ],
                projectList: [],
                listHeight: 300,
                currentPage: 1,
                pageCount: 10,
                searchKey: '',
                totalCount: 0,
                pageLength: 0,
                showCreateProject: false
            }
        },

        mounted() {
            let count = Math.floor((this.$refs.contentLayout.clientHeight  - 44) / 56);
            this.pageCount = count > 8 ? count : 8;
            this.getMyProjectList();
        },

        methods: {
            closeCreateProject(projectId) {
                this.showCreateProject = false;
                if (projectId) {
                    this.getMyProjectList();
                }
            },
            keyDown(event){
                if(event.key === 'Enter'){
                    this.getMyProjectList();
                }
            },
            getMyProjectList() {
                let data = {
                    searchKey: this.searchKey,
                    page: this.currentPage,
                    per_page: this.pageCount
                };
                api.project.getProjectList(data, (projectList, meta) => {
                    this.projectList = projectList;
                    this.totalCount = meta.total;
                    this.pageLength = Math.ceil(meta.total / this.pageCount)
                });
            },
            getProjectIcon(project) {
                if (project.icon.startsWith('http')) {
                    return project.icon
                } else {
                    return require('../../assets/images/project/' + project.icon + '.png')
                }
            },
            getProjectMgrIcon(mgr) {
                if (mgr.avatar.startsWith('http')) {
                    return mgr.avatar
                } else {
                    return require('../../assets/images/avatar/' + mgr.avatar + '.png')
                }
            },
            goToProject(projectId) {
                router.push({name: 'projectDetailBlockPage', params: {projectId: projectId}})
            }
        }
    }
</script>

<style lang="less" scoped src="./assets/style/index.less">

</style>

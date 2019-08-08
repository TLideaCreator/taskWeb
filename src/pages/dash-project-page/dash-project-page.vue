<template>
    <v-container fluid ref="contentLayout">
        <InputPage
                v-model="searchKey"
                createTitle="新项目"
                :total="totalCount"
                :itemHeight="62"
                placeholder="请输入项目名称"
                @createNew="showCreateProject=true"
                @search="getMyProjectList"
                @page-changed="getMyProjectList"
        ></InputPage>
        <v-divider></v-divider>
        <v-list class="bgTrans">
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
                    <v-list-item-action-text>
                        {{project.mgr.data.name}}
                    </v-list-item-action-text>
                    <v-list-item-avatar>
                        <v-img :src="getProjectMgrIcon(project.mgr.data)"></v-img>
                    </v-list-item-avatar>
                </v-list-item>
                <v-divider
                        :key="index"
                ></v-divider>
            </template>
        </v-list>
        <v-dialog
            v-model="showCreateProject"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-layout fill-height column style="background-color:white; padding:20px">
                <v-btn icon @click="showCreateProject = false" text>
                    <v-icon>close</v-icon>
                </v-btn>
                <ProjectCreatePage
                        @create-success="closeCreateProject"
                ></ProjectCreatePage>
            </v-layout>
        </v-dialog>
    </v-container>
</template>

<script>
    import api from '@/api';
    import {router} from '@/utils';
    import ProjectCreatePage from "../../components/CreateProject/create-project";
    import InputPage from "../../components/InputPage";

    export default {
        name: 'dash-project-page',
        components: {ProjectCreatePage, InputPage},
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
        methods: {
            closeCreateProject(projectId) {
                this.showCreateProject = false;
                if (projectId) {
                    this.getMyProjectList();
                }
            },
            getMyProjectList(data) {
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

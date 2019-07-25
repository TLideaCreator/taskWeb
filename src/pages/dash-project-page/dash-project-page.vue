<template>
    <v-layout column fill-height class="contentLayout">
        <v-breadcrumbs :items="items">
            <template v-slot:divider>
                <v-icon>chevron_right</v-icon>
            </template>
        </v-breadcrumbs>
        <v-divider></v-divider>
        <v-content style="margin: 0; padding: 0">
            <v-list style="background: transparent">
                <template
                        v-for="project in projectList"
                >
                    <v-list-item
                            :key="project.id"
                            style="background: transparent"
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
                            :key="project.id"
                    ></v-divider>
                </template>

            </v-list>
        </v-content>
    </v-layout>
</template>

<script>
    import api from '@/api';
    import {router} from '@/utils';

    export default {
        name: 'dash-project-page',
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
                pageCount: 1,
                currentPage: 0,
                searchKey: '',
                totalCount: 0
            }
        },

        mounted() {
            this.getMyProjectList();
        },

        methods: {
            getMyProjectList() {
                let data = {
                    searchKey: this.searchKey,
                    page: this.currentPage,
                    per_page: this.pageCount
                };
                api.project.getProjectList(data, (projectList, meta) => {
                    this.projectList = projectList;
                    this.totalCount = meta.total
                });
            },
            getProjectIcon(project){
                if(project.icon.startsWith('http')){
                    return project.icon
                }else{
                    return require('../../assets/images/project/'+project.icon+'.png')
                }
            },
            getProjectMgrIcon(mgr){
                if(mgr.avatar.startsWith('http')){
                    return mgr.avatar
                }else{
                    return require('../../assets/images/avatar/'+mgr.avatar+'.png')
                }
            },
            goToProject(projectId){
                router.replace()
            }
        }
    }
</script>

<style lang="less" scoped src="./assets/style/index.less">

</style>

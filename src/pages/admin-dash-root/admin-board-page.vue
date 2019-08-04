<template>
    <v-layout align-center justify-space-around row fill-height wrap>
        <v-flex md3>
            <v-card
                @click="goToPage('adminBoardProjectsPage')"
            >
                <v-card-title>
                    <v-spacer></v-spacer>
                    项目
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <h1 class="cardTitle">
                        {{projectCount}}
                    </h1>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click.stop="showCreateProject = true">
                        <v-icon>add</v-icon>
                        新项目
                    </v-btn>
                    <v-dialog v-model="showCreateProject" fullscreen hide-overlay transition="dialog-bottom-transition">
                        <v-layout fill-height column style="background-color:white; padding:20px">
                            <v-btn icon @click="showCreateProject = false" text>
                                <v-icon>close</v-icon>
                            </v-btn>
                            <ProjectCreatePage
                                    @create-success="closeCreateProject"
                            ></ProjectCreatePage>
                        </v-layout>
                    </v-dialog>

                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex md3>
            <v-card
                    :to="{name: 'adminBoardUsersPage'}"
            >
                <v-card-title>
                    <v-spacer></v-spacer>
                    用户
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text><h1 class="cardTitle">{{userCount}}</h1></v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success">
                        <v-icon>add</v-icon>
                        新用户
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-flex>

        <v-flex md3>
            <v-card
                    :to="{name: 'adminBoardTemplatePage'}"
            >
                <v-card-title>
                    <v-spacer></v-spacer>
                    模板
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text><h1 class="cardTitle">{{tempCount}}</h1></v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success">
                        <v-icon>add</v-icon>
                        新模板
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import api from '@/api';
    import {router} from '@/utils';
    import ProjectCreatePage from "../../components/CreateProject/create-project";

    export default {
        name: "admin-dash-page.vue",
        components: {ProjectCreatePage},
        data() {
            return {
                userCount: 0,
                projectCount: 0,
                tempCount: 0 ,
                showCreateProject: false
            }
        },
        computed: {},
        created(){
            this.getSystemStatics();
        },
        methods: {
            goToPage(path){
                router.replace({'name':path})
            },
            closeCreateProject(projectId) {
                this.showCreateProject = false;
                if (projectId) {
                    this.getSystemStatics();
                }
            },
            getSystemStatics(){
                api.system.getSystemStatics(result=>{
                    this.userCount = result.data.users;
                    this.projectCount = result.data.projects;
                    this.tempCount = result.data.temps;
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .cardTitle {
        text-align: center;
    }

</style>

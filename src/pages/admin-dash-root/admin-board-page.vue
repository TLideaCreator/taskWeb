<template>
    <v-layout align-center justify-space-around row fill-height wrap>
        <v-flex md3>
            <v-card
                :to="{name: 'dashProjects'}"
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
                    <v-btn color="success">
                        <v-icon>add</v-icon>
                        新项目
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex md3>
            <v-card
                    :to="{name: 'dashUsers'}"
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
                    :to="{name: 'dashTemps'}"
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
    export default {
        name: "admin-dash-page.vue",
        data() {
            return {
                userCount: 0,
                projectCount: 0,
                tempCount: 0
            }
        },
        computed: {},
        created(){
            this.getSystemStatics();
        },
        methods: {
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

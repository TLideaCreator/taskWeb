<template>
    <v-container fluid>
        <v-layout wrap>
            <v-flex xs12 sm6 md4 lg3
                    v-for="template in templateList"
                    :key="template.id"
            >
                <v-card class="mt-5"
                        :to="{name:'systemTempDetailPage', params:{templateId:template.id}}">
                    <v-img
                            :src="template.img"
                            height="200px"
                            class="white--text"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    >
                        <v-card-title
                                class="fill-height align-end"
                                style="color:white">
                            {{template.name}}
                        </v-card-title>
                    </v-img>

                    <v-card-text>
                        {{template.desc}}
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-dialog v-model="createNewTemp" fullscreen>
            <template v-slot:activator="{on}">
                <v-btn
                        absolute
                        dark
                        top
                        right
                        color="success"
                        v-on="on"
                >
                    <v-icon>add</v-icon>新模板
                </v-btn>
            </template>
            <v-layout fill-height column style="background-color: white; padding:20px">
                <v-btn
                        fab
                        small
                        @click="createNewTemp=false"
                >
                    <v-icon>close</v-icon>
                </v-btn>
                <v-layout fill-height>

                </v-layout>
            </v-layout>
        </v-dialog>
    </v-container>
</template>

<script>
    import api from '@/api';

    export default {
        name: "admin-board-project",
        data() {
            return {
                templateList: [],
                createNewTemp: false
            }
        },
        created() {
            this.getTemplateList();
        },
        methods: {
            getTemplateList() {
                api.system.getProjectTemplate(templates => {
                    this.templateList = templates;
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~@/assets/style/constants.less";
    @import "~@/assets/style/common.less";
</style>

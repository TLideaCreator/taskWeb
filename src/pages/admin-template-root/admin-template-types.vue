<template>
    <v-container fluid>
        <v-layout wrap>
            <v-flex
                xs12 sm6 md4 lg3
                v-for="type in typeList"
                :key="type.id"
            >
                <v-card class="ma-2">
                    <v-card-title>
                        {{type.name}}
                    </v-card-title>
                    <v-card-text>
                        <v-icon>{{type.icon}}</v-icon>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-dialog v-model="newType"
            max-width="350"
        >
            <template v-slot:activator="{on}">
                <v-btn
                        absolute
                        dark
                        color="success"
                        right
                        top
                        v-on="on"
                >
                    <v-icon>add</v-icon>新类型
                </v-btn>
            </template>
            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="info" text @click="createNewType">新建</v-btn>
                    <v-btn @click="newType = false" text>
                        取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import api from '@/api';
    export default {
        name: "admin-template-types",
        props: {
            templateId: {
                type: String,
                default: ''
            },
        },
        data(){
            return {
                newType: false,
                typeList: []
            }
        },
        created(){
            this.getTemplateTypeList();
        },
        methods:{
            createNewType(){},
            getTemplateTypeList(){
                api.template.type.getList(this.templateId, list=>{
                    this.typeList = [...list];
                });
            }
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>

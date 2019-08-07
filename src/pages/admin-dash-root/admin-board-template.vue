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
        <v-dialog
                v-model="newTempDialog"
                max-width="450"
                persistent
        >
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
            <v-card>
                <v-card-title>创建模板</v-card-title>
                <v-img
                        v-show="showTempTitle(newTemp)"
                        :src="newTemp.img"
                        height="200px"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                >
                    <v-card-title>{{newTemp.name}}</v-card-title>
                </v-img>
                <v-card-text>
                    <v-form
                        ref="form"
                        v-model="createValid"
                    >
                        <v-text-field
                                v-model="newTemp.name"
                                :rules="notEmptyRules"
                                label="模板名称"
                        ></v-text-field>
                        <v-textarea
                                v-model="newTemp.desc"
                                label="模板描述"
                        ></v-textarea>
                        <v-file-input
                                accept="image/*"
                                prepend-icon="mdi-camera"
                                @change="fileChanged"
                                label="请选择需要上传的封面图片">
                        </v-file-input>
                    </v-form>

                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="success" :disabled="!createValid" @click="createSystemTemplate">创建</v-btn>
                    <v-btn text @click="newTempDialog=false">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import api from '@/api';
    import {consts, valid, router} from '@/utils';
    export default {
        name: "admin-board-template",
        data() {
            return {
                templateList: [],
                newTempDialog: false,
                newTemp: {
                    name: '',
                    img: '',
                    desc: ''
                },
                createValid: false
            }
        },
        created() {
            this.getTemplateList();
        },
        computed:{
            notEmptyRules(){
                return valid.notEmptyRule('请输入模板名称')
            }
        },
        methods: {
            showTempTitle(temp){
                return !consts.stringIsEmptyWithTrim(temp.name) && !consts.stringIsEmptyWithTrim(temp.img)
            },
            getTemplateList() {
                api.template.getList(templates => {
                    this.templateList = templates;
                })
            },
            createSystemTemplate(){
                api.template.create(this.newTemp, temp => {
                    this.newTemp = {
                        name: '',
                        img: '',
                        desc: ''
                    };
                    this.newTempDialog = false;
                    router.replace({name: 'systemTempDetailPage', params:{templateId: temp.id}});
                });
            },
            fileChanged(files){
                this.newTemp.img = files[0];
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~@/assets/style/constants.less";
    @import "~@/assets/style/common.less";
</style>

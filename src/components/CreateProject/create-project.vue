<template>
    <v-layout class="createProjectStep1Style" justify-center align-center>
        <v-flex md4 v-show="!showAvatarPop">
            <h2 class="textCenter">欢迎使用任务看板</h2>
            <h3 class="textCenter" style="margin-top: 20px">
                由此您将创建一个新的项目
            </h3>
            <v-layout justify-center align-center>
                <img :src="require('./assets/images/board.jpeg')" class="imgStyle"/>
            </v-layout>
        </v-flex>
        <v-flex md4 v-show="showAvatarPop">
            <img v-for="index in 30" :key="index"
                 class="projectImg"
                 @click="changeProjectIcon(index)"
                 :src="require('../../assets/images/project/'+index+'.png')"/>
        </v-flex>
        <v-flex md3>
            <h3 style="text-align: center">创建项目</h3>
            <v-layout justify-center align-cneter>
                <v-flex md2 align-self-center>
                    <v-img class="projectImg"
                           @click="showAvatarPop = !showAvatarPop"
                           :src="require('../../assets/images/project/'+projectIcon+'.png')"></v-img>
                </v-flex>
                <v-flex md8>
                    <v-text-field
                            v-model="projectName"
                            placeholder="请输入项目名称"></v-text-field>
                    <v-select v-model="tempId" :items="tempList"
                              item-text="name"
                              placeholder="请选择项目模板"
                              item-value="id"
                    >
                    </v-select>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-spacer></v-spacer>
                <v-btn
                        text
                        small
                        @click="showMore = !showMore"
                >
                    <u>更多</u>
                    <v-icon>
                        {{showMore?'expand_more':'expand_less'}}
                    </v-icon>
                </v-btn>
            </v-layout>
            <v-layout v-show="showMore">
                <v-textarea
                        v-model="projectDesc"
                        style="margin-bottom: 20px"
                        placeholder="请输入项目描述"
                ></v-textarea>
            </v-layout>

            <v-layout>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="createProject">创建</v-btn>
                <v-spacer></v-spacer>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    import api from "@/api";
    import {consts, toast} from "@/utils";

    export default {
        name: "project-create-page",
        data() {
            return {
                showMore: false,
                projectName: '',
                projectDesc: '',
                projectIcon: '1',
                tempId: '',
                showAvatarPop: false,
                tempList: []
            }
        },
        beforeCreate() {
            api.template.getList(result => {
                this.tempList = result;
                this.tempId = result[0].id
            })
        },
        methods: {
            resetVar() {
                this.projectName = '';
                this.projectDesc = '';
                this.projectIcon = '1';
                this.showMore = false;
                this.tempId = this.tempList[0].id;
            },
            changeProjectIcon(index) {
                this.showAvatarPop = false;
                this.projectIcon = '' + index;
            },
            createProject() {
                if (consts.stringIsEmptyWithTrim(this.projectName)) {
                    toast.error('请输入项目名称');
                    return;
                }
                let data = {
                    name: this.projectName,
                    desc: this.projectDesc,
                    icon: this.projectIcon,
                    temp: this.tempId
                };
                api.project.createProject(data, (project) => {
                    this.$emit('create-success', project);
                    this.resetVar();
                });
            }
        }
    }
</script>

<style scoped>
    .createProjectStep1Style {
        width: 100%;
        height: 500px;
        display: flex;
    }

    .imgStyle {
        margin: 10px 88px;
        width: 200px;
        height: 120px;
    }

    .textCenter {
        text-align: center
    }

    .projectImg {
        width: 40px;
        height: 40px;
        margin: 10px;
    }
</style>

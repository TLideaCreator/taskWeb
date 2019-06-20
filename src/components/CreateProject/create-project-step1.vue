<template>
    <Row class="createProjectStep1Style" type="flex" justify="space-around" align="middle">
        <Col :span="10" v-show="!showAvatarPop">
            <h2 class="textCenter">欢迎使用任务看板</h2>
            <h3 class="textCenter" style="margin-top: 20px">
                由此您将创建一个新的项目
            </h3>
            <Row type="flex" justify="center" align="middle">
                <img :src="require('./assets/images/board.jpeg')" class="imgStyle"/>
            </Row>
        </Col>
        <Col :span="10" v-show="showAvatarPop" >
            <img v-for="index in 30" :key="index"
                 class="projectImg"
                 @click="changeProjectIcon(index)"
                 :src="require('../../assets/images/project/'+index+'.png')"/>
        </Col>
        <Col :span="8">
            <Row type="flex" justify="space-around" align="middle">
                <Col :span="8">
                    <Button type="text" @click="showAvatarPop = !showAvatarPop">
                        <img class="projectImg"
                             :src="require('../../assets/images/project/'+projectIcon+'.png')"/>
                    </Button>
                </Col>
                <Col :span="16">
                    <h2 class="textCenter">请输入项目名称</h2>
                    <Input  v-model="projectName"
                            style="margin:20px auto;"
                            placeholder="请输入项目名称"/>
                </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
                <Col :span="8">
                    <p style="text-align: center">项目模板</p>
                </Col>
                <Col :span="16">
                    <Select v-model="tempId">
                        <Option v-for="temp in tempList"
                                :key="temp.id"
                                :value="temp.id"
                        >
                            {{temp.name}}
                        </Option>
                    </Select>
                </Col>
            </Row>

            <Button type="text"
                    size="small"
                    :icon="showMore?'ios-arrow-down':'ios-arrow-forward'"
                    style="color: #098aff; margin: 20px 0"
                    @click="showMore = !showMore"
            ><u>更多</u></Button>
            <Input v-show="showMore"
                   v-model="projectDesc"
                   style="margin-bottom: 20px"
                   placeholder="请输入项目描述"
                   type="textarea" :rows="3"
                   :autosize="{minRows: 3,maxRows: 4}"/>
            <Row type="flex" justify="end">
                <Button type="primary" @click="createProject">创建</Button>
            </Row>
        </Col>
    </Row>
</template>

<script>
    import api from "@/api";
    import {consts,toast} from "@/utils";

    export default {
        name: "create-project-step1",
        data(){
            return {
                showMore:false,
                projectName: '',
                projectDesc: '',
                projectIcon: '1',
                tempId: '',
                showAvatarPop: false,
                tempList: []
            }
        },
        beforeCreate(){
            api.system.getDefaultProjectTemplate(result=>{
                this.tempList = result;
                this.tempId = result[0].id
            })
        },
        methods:{
            resetVar(){
                this.projectName = '';
                this.projectDesc = '';
            },
            changeProjectIcon(index){
                this.showAvatarPop = false;
                this.projectIcon = ''+index;
            },
            createProject(){
                if(consts.stringIsEmptyWithTrim(this.projectName)){
                    toast.error('请输入项目名称');
                    return;
                }
                let data = {
                    name:this.projectName,
                    desc: this.projectDesc,
                    icon: this.projectIcon,
                    temp: this.tempId
                };
                api.project.createProject(data,(project)=>{
                    this.$emit('create-success',project);
                });
            }
        }
    }
</script>

<style scoped>
    .createProjectStep1Style{
        width: 900px !important;
        height: 500px;
        display: flex;
    }
    .imgStyle{
        margin: 10px 88px;
        width: 200px;
        height: 120px;
    }
    .textCenter{
        text-align: center
    }
    .projectImg{
        width: 40px ;
        height: 40px ;
        margin: 10px;
    }
</style>

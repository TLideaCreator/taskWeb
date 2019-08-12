<template>
    <v-container fluid>
        <NameFilterLine></NameFilterLine>

        <SprintItem
                v-for="sprint in sprints"
                :key="sprint.id"
                :tasks="sprint.tasks.data"
                :members="members"
                :taskTypes="taskTypes"
                :sprintItem="sprint"
                :active="activeSprint"
                @taskActions="updateSprintList"
        >
        </SprintItem>
        <v-btn
                absolute
                dark
                right
                top
            color="success"
                @click="createNewSprint"
        >
            <v-icon>
                add
            </v-icon>
            创建新冲刺
        </v-btn>
    </v-container>
</template>

<script>
    import api from '@/api';
    import NameFilterLine from '@/components/NameFilterLine';
    import SprintItem from "./components/SprintItem";
    import {consts} from '@/utils';
    export default {
        name: "project-detail-block.vue",
        components: {SprintItem, NameFilterLine},
        props: {
            projectId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                sprints: [],
                taskTypes: [],
                members: [],
                taskList: [],
                activeSprint: false
            }
        },
        created() {
            this.getProjectSprintList();
        },
        computed: {

        },
        methods: {
            createNewSprint(){
                api.sprint.createSprint(this.projectId,item=>{
                    if(this.sprints.length >1 && this.sprints[0].status === 1){
                        let sprintList = consts.objectCopy(this.sprints);
                        sprintList.splice(1,0,item);
                        this.sprints = sprintList;
                    }else{
                        this.sprints = [
                            item,
                            ...this.sprints
                        ];
                    }
                })
            },
            getProjectSprintList() {
                api.sprint.getSprintList(this.projectId, null, (sprints , meta) => {
                    this.sprints = sprints;
                    this.taskList = [];
                    this.taskTypes = meta.types;
                    for (let i = 0; i < sprints.length; i++) {
                        if(sprints[i].status === 1){
                            this.activeSprint = true;
                            break;
                        }
                    }
                })
            },
            updateSprintList(task){
                this.sprints.forEach(sprint=>{
                    if(!consts.stringIsEmptyWithTrim(task.from)){
                        if(sprint.id === task.from){
                            let index = -1;
                            for(let i=0; i< sprint.tasks.data.length; i++){
                                if(sprint.tasks.data[i].id === task.task.id){
                                    index = i;
                                    break;
                                }
                            }
                            if(index > -1){
                                sprint.tasks.data.splice(index,1);
                            }
                        }
                    }
                    if(!consts.stringIsEmptyWithTrim(task.to)){
                        if(sprint.id === task.to){
                            sprint.tasks.data.push(task.task)
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <v-container fluid>
        <div :style="fullHeight" style="overflow-y: auto">
            <div style="display: flex ; min-width: 360px ">
                <v-card class="ma-2"
                        min-width="350"
                    v-for="(status, index) in statusList"
                        :key="index+'_'+status.id"
                >
                    <v-card-title>{{status.name}}</v-card-title>
                    <v-divider :color="status.color" style="height: 5px"></v-divider>
                </v-card>
            </div>
            <div style="display: flex; margin-top: 10px ;" :style="blockHeight">
                <div
                     v-for="(status, index) in statusList"
                     :key="index+'_'+status.id"
                     class="ma-1"
                     style="border-radius: 5px;overflow-x: auto; min-width: 360px"
                >
                    <drag
                            v-for="task in getTaskStateList(status.id)"
                            :key="task.id"
                            class="ma-2"
                    >
                        <v-card
                                min-width="320"

                        >
                            <v-card-title>{{task.title}}</v-card-title>
                        </v-card>
                    </drag>

                </div>
            </div>
        </div>
    </v-container>
</template>

<script>
    import api from '@/api';
    export default {
        props: {
            projectId: {
                type: String,
                default: ''
            }
        },
        data(){
            return {
                sprint: {},
                statusList: []
            };
        },
        created() {
            this.getProjectActiveSprint();
        },
        computed:{
            blockHeight(){
                let height = this.$store.state.contentFullHeight ;
                return {
                    height: (height-88)+'px'
                }
            },
            fullHeight(){
                return this.$store.getters.fullHeight;
            }
        },
        methods:{
            getTaskStateList(key) {
                return this.sprint.tasks.data.filter(item=>{
                    return item.status === key;
                });
            },
            getProjectActiveSprint(){
                api.sprint.getSprintList(this.projectId, 'active' , (sprints, meta)=>{
                    if(sprints && sprints.length > 0){
                        this.sprint = sprints[0];
                        this.statusList = [...meta.status]
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~@/assets/style/constants.less";
    @import "~@/assets/style/common.less";
</style>

<template>
    <v-card>
        <v-card-title>

        </v-card-title>
        <v-card-text>

        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="info" @click="$emit('updateTaskItem', task)">保存</v-btn>
            <v-btn text @click="$emit('cancel')">取消</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "TaskDetail",
        props:{
            taskItem: {
                type: Object,
                default:()=>{
                    return {}
                }
            }
        },
        data(){
            return {
                task: this.taskItem
            }
        },
        watch:{
            taskItem(val){
                this.task = val
            }
        }
    }
</script>

<style scoped>

</style>

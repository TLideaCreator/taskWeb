<template>
    <v-card width="600">
        <v-card-title>

        </v-card-title>
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

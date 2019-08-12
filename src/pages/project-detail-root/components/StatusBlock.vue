<template>
    <v-flex xs3 style="min-width: 400px;">
        <v-card class="ma-2">
            <v-card-title>{{status.name}}</v-card-title>
            <v-divider :color="status.color" style="height: 5px"></v-divider>
        </v-card>
       <div :style="maxHeight" style="overflow-x: auto;">
           <v-card
                   class="ma-2"
                   v-for="index in 4"
                   :key="index"
                   height="200"
           ></v-card>
       </div>
    </v-flex>
</template>

<script>
    export default {
        name: "StatusBlock",
        props: {
            statusItem:{
                type: Object,
                default:()=>{
                    return {}
                }
            }
        },
        computed:{
            maxHeight(){
                let height = this.$store.state.contentFullHeight ;
                return {
                    maxHeight: (height-72)+'px'
                }
            }
        },
        data(){
            return {
                status: this.statusItem
            }
        }
    }
</script>

<style scoped>

</style>

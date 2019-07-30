<template>
   <v-layout align-center justify-center fill-height column style="background: white">
       <img src="./assets/image/404.jpg" style="width: 775px; height: 350px "/>
       <h4></h4>
       <h1 style="text-align: center">你找的页面不存在，{{second}}跳转到首页</h1>
   </v-layout>
</template>

<script>
    import {consts,router} from "@/utils";

    export default {
        name: "not-found-page",
        data(){
            return {
                second: 3
            }
        },
        mounted(){
            let time = setInterval(()=>{
                if(this.second === 0){
                    router.replace({name: 'login'});
                    window.clearInterval(time);
                    return;
                }
                this.second --;
            },1000);
        },

        computed: {
            fullHeight() {
                return consts.contentHeight;
            }
        }
    }
</script>

<style scoped>

</style>

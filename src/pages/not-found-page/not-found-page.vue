<template>
   <Layout :style="fullHeight" style="background: white">
       <Row type="flex" justify="center" align="middle" style="height: 100%">
           <Col :span="10" style="margin-bottom: 200px">
               <img src="./assets/image/404.jpg" style="width: 100%; height: 100% "/>
               <h1 style="text-align: center">你找的页面不存在，{{second}}跳转到首页</h1>
           </Col>
       </Row>
   </Layout>
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

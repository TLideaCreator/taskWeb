<template>
    <v-app>
        <v-toolbar app color="indigo" dark >
            <v-avatar :size="32">
                <img :src="require('../../assets/images/logo.png')" alt="avatar">
            </v-avatar>
            <span style="font-size: 20px; font-weight: 900; padding-left: 10px" >有序</span>

        </v-toolbar>
        <v-content app>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: "dash-root-page.vue"
    }
</script>

<style scoped>

</style>

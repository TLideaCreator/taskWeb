<template>
    <v-app>
        <v-toolbar app color="indigo" dark :height="44">
            <v-avatar :size="32">
                <img :src="require('../../assets/images/logo.png')" alt="avatar">
            </v-avatar>
            <span style="font-size: 20px; font-weight: 900; padding-left: 10px" >有序</span>
            <v-text-field style="margin-left: 30px"></v-text-field>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <template v-slot:activator="{on}">
                    <v-avatar :size="36"
                        v-on="on"
                    >
                        <img :src="userInfo.avatar"/>
                    </v-avatar>
                </template>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-content>123</v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-menu>

        </v-toolbar>
        <v-content app>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import {consts} from '@/utils';
    export default {
        name: "dash-root-page.vue",
        data(){
            return {
                userInfo:{}
            }
        },
        beforeCreate() {
            this.userInfo = consts.userInfo;
        }
    }
</script>

<style scoped>

</style>

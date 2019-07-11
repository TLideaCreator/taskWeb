<template>
    <v-app>
        <v-toolbar app color="indigo" dark :height="44">
            <v-avatar :size="32">
                <img :src="require('../assets/images/logo.png')" alt="avatar">
            </v-avatar>
            <span style="font-size: 20px; font-weight: 900; padding-left: 10px" >有序</span>
            <v-text-field style="margin-left: 30px"></v-text-field>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-tooltip bottom >
                <template v-slot:activator="{on}">
                    <v-btn flat icon v-on="on"
                           @click="gotoAdminDash"
                           v-show="isAdmin">
                        <v-icon>view_comfy</v-icon>
                    </v-btn>
                </template>
                <span>管理员面板</span>
            </v-tooltip>
            <v-menu offset-y bottom left>
                <template v-slot:activator="{on}">
                    <v-avatar :size="36"
                        v-on="on"
                    >
                        <img :src="userInfo.avatar"/>
                    </v-avatar>
                </template>
                <v-card>
                    <v-list-tile >
                        <v-list-tile-content>个人设置</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="logout()">
                        <v-list-tile-content>退出登录</v-list-tile-content>
                    </v-list-tile>
                </v-card>
            </v-menu>

        </v-toolbar>
        <v-content app>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import {consts,router} from '@/utils';
    export default {
        name: "dash-root-page.vue",
        data(){
            return {
                userInfo:{}
            }
        },
        computed:{
          isAdmin(){
              return consts.userInfo.admin === 'Yes'
          }
        },
        methods:{
            logout(){
                consts.cleanLoginUserInfo();
                router.replace({
                    name: 'login'
                });
            },
            gotoAdminDash(){
                router.replace({
                    name: 'admin-board'
                });

            }
        },
        beforeCreate() {
        }
    }
</script>

<style scoped>

</style>

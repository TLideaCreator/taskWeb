<template>
    <v-app>
        <v-alert
                v-model="alert"
                dismissible
                type="success"
                style="z-index: 999; right: 0; top: 44px; margin: 0 0 0 50%"
        >
            This is a success alert that is closable.
        </v-alert>
        <v-snackbar right bottom>

        </v-snackbar>
        <v-toolbar app :height="44" v-if="!isUserLogin">
            <v-spacer></v-spacer>
            <v-avatar>
                <img src="../assets/images/logo.png" style="width: 32px ; height: 32px"/>
            </v-avatar>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-toolbar app color="blue accent-2" dark :height="44" v-else>
            <v-avatar :size="32">
                <img :src="require('../assets/images/logo.png')" alt="avatar">
            </v-avatar>
            <span style="font-size: 20px; font-weight: 900; padding-left: 10px">优序</span>
            <v-text-field style="margin-left: 30px"></v-text-field>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
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
                        <img :src="avatarUrl"/>
                    </v-avatar>
                </template>
                <v-card>
                    <v-list-tile>
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
        <v-footer app v-show="!isUserLogin">
            <v-layout align-center justify-center row>
                <v-flex text-xs-center xs12>
                    ©️Tommy Lee
                </v-flex>
            </v-layout>
        </v-footer>
    </v-app>

</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        data(){
          return {
              alert: true
          }
        },
        created() {
            this.init();
        },
        computed: {
            ...mapGetters([
                'isAdmin',
                'isUserLogin',
                'avatarUrl'
            ])
        },
        methods:{
            ...mapActions([
                'init',
            ]),
            gotoAdminDash(){

            },
            logout(){

            }
        }
    }
</script>

<style lang="less" scoped>

</style>

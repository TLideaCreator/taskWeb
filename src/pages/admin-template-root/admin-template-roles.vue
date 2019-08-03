<template>
    <v-container wrap style="padding: 0 ; margin: 0">
        <v-flex xs12 sm6 md4 lg3
                v-for="role in 8"
                :key="role"
        >
            <role-card
                    :role="roleList[role%4]"
            ></role-card>
        </v-flex>
        <v-btn
                dark
                fab
                color="pink"
                style="position: absolute; bottom: 20px; right:20px"
        >
            <v-icon>add</v-icon>
        </v-btn>
    </v-container>
</template>

<script>
    import api from '@/api';
    import RoleCard from "../../components/role-card";

    export default {
        name: "admin-template-roles",
        components: {RoleCard},
        props: {
            templateId: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                roleList: []
            }
        },
        created() {
            this.getTemplateRoles();
        },
        methods: {
            getTemplateRoles() {
                api.template.getTemplateRoleList(this.templateId, roleList => {
                    this.roleList = roleList;
                })
            }
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>

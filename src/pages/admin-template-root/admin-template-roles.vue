<template>
    <v-layout wrap>
        <role-card
            v-for="role in roleList"
            :key="role.id"
            :role="role"
        ></role-card>
        <v-btn absolute
               dark
               fab
               bottom
               right
               class="mb-12"
               color="pink">
            <v-icon>add</v-icon>
        </v-btn>
    </v-layout>
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
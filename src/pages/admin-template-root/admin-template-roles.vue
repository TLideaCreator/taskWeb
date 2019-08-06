<template>
    <v-container fluid>
        <v-layout wrap fill-height>
            <v-flex xs12 sm6 md4 lg3
                    v-for="role in roleList"
                    :key="role.id"
            >
                <role-card
                        :role="role"
                ></role-card>
            </v-flex>
        </v-layout>
        <v-btn
                dark
                color="success"
                absolute
                top
                right
        >
            <v-icon>add</v-icon>新角色
        </v-btn>
    </v-container>
</template>

<script>
    import api from '@/api';
    import RoleCard from "@/components/RoleCard.vue";

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
                api.template.role.getList(this.templateId, roleList => {
                    this.roleList = roleList;
                })
            }
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>

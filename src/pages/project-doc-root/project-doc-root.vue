<template>
    <v-container fluid>
        <v-row no-getters>
            <v-col :cols="9">
                <router-view></router-view>
            </v-col>
            <v-col :cols="3" class="catalogSide">
                <v-list>
                    <v-list-item></v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "project-doc-root.vue",
        props: {
            projectId: {
                type: String,
                default: ''
            }
        },
        methods:{
            ...mapActions({
                'loadDocList': 'doc/loadProjectDocList'
            })
        },
        computed:{
            ...mapGetters({
                'catalog': 'doc/getCatalog'
            })
        },
        created() {
            this.loadDocList(this.projectId);
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>

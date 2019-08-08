<template>
    <v-container fluid>
        <NameFilterLine></NameFilterLine>

        <SprintItem
                v-for="sprint in sprints"
                :key="sprint.id"
                :sprint="sprint"
                :taskTypes="taskTypes"
        >
        </SprintItem>
        <v-btn
                absolute
                dark
                right
                top
            color="success"
        >
            <v-icon>
                add
            </v-icon>
            创建新冲刺
        </v-btn>
    </v-container>
</template>

<script>
    import api from '@/api';
    import NameFilterLine from '@/components/NameFilterLine';
    import SprintItem from "../../components/SprintItem";

    export default {
        name: "project-detail-block.vue",
        components: {SprintItem, NameFilterLine},
        props: {
            projectId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                sprints: [],
                taskTypes: []
            }
        },
        created() {
            this.getProjectSprintList();
        },
        computed: {
            members() {
                return []
            }
        },
        methods: {
            getProjectSprintList() {
                api.sprint.getSprintList(this.projectId, null, (sprints , meta) => {
                    this.sprints = sprints;
                    this.taskTypes = meta.types;
                })
            }
        }
    }
</script>

<style scoped>

</style>

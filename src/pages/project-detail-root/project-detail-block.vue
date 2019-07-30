<template>
    <v-layout column fill-height class="contentLayout">
        <NameFilterLine></NameFilterLine>
        <v-flex xs12
                v-for="sprint in sprints"
                :key="sprint.id"
        >
            冲刺-S{{sprint.name}}
        </v-flex>
    </v-layout>
</template>

<script>
    import api from '@/api';
    import NameFilterLine from '@/components/NameFilterLine';

    export default {
        name: "project-detail-block.vue",
        components: {NameFilterLine},
        props: {
            projectId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                sprints: []
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
                api.sprint.getSprintList(this.projectId, null, (sprints, meta) => {
                    this.sprints = sprints;
                    console.log('sprints ', sprints);
                })
            }
        }
    }
</script>

<style scoped>

</style>

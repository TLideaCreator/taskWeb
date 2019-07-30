<template>
    <v-layout column fill-height class="contentLayout">
        <NameFilterLine></NameFilterLine>
        <v-list>
            <v-list-item-group
                    v-for="sprint in sprints"
                    :key="sprint.id"
                    :value="true"
            >
               <template v-slot:activator>
                   <v-list-item-content>
                       <v-list-item-title>
                           冲刺-S{{sprint.name}}
                       </v-list-item-title>
                   </v-list-item-content>
               </template>
                <v-list-item
                    v-for="task in sprint.tasks.data"
                    :key="task.id"
                >
                    <v-list-item-content>
                        <v-list-item-title>
                            {{task.title}}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
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
                api.sprint.getSprintList(this.projectId, null, (sprints) => {
                    this.sprints = sprints;
                })
            }
        }
    }
</script>

<style scoped>

</style>

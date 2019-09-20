<template>
    <div class="ma-2"
        style="min-width: 300px; max-width: 320px;"
    >
        <v-card class="titleCard"
                min-width="300px"
                max-width="320px"
        >
            <v-card-title style="font-size: medium">{{status.name}}</v-card-title>
            <hr :style="{background:status.color}" style="height: 5px; border: none;"/>
        </v-card>
        <drop
                style="border-radius: 5px;overflow-x: auto; min-width: 300px; min-height: 500px"
                tag="div"
                :style="blockStyle"
                @drop="$emit('updateTaskStatus',{task: $event, statusId:status.id})"
        >
            <drag
                    v-for="task in tasks"
                    :key="task.id"
                    :transfer-data="task"
                    class="mt-5 mb-5 ml-2 mr-2"
                    @dragstart="$emit('taskInDrag',indexes)"
                    @dragend="$emit('taskInDrag',-1)"
            >
                <v-hover v-slot:default="{ hover }"
                         :open-delay="800"
                >
                    <v-card
                            @click="$emit('taskItemClick', task)"
                            max-width="320"
                    >
                        <v-card-title style="font-size: medium">{{task.title}}</v-card-title>
                        <v-expand-transition>
                            <v-card-text v-if="hover">
                                <div
                                        style="min-height: 88px;"
                                >
                                    {{task.desc}}
                                </div>
                            </v-card-text>
                            <v-card-text v-else
                                         style="min-height: 88px;"
                            >
                                <v-layout align-center>
                                    <v-avatar class="mr-4">
                                        <v-img
                                                v-if="task.executor&& task.executor.data"
                                                :src="(task.executor.data)|userAvatar"
                                        ></v-img>
                                    </v-avatar>
                                    {{task|loadTaskExecutorName}}
                                </v-layout>
                                <v-layout class="mt-2">
                                    <v-icon :color="prioritiesList(task.priority).color" class="mr-2">
                                        {{typeList(task.type)}}
                                    </v-icon>
                                    <span>{{prioritiesList(task.priority).name}}</span>
                                    <v-spacer></v-spacer>
                                    <span :style="{color:status.color}">{{status.name}}</span>
                                </v-layout>
                            </v-card-text>
                        </v-expand-transition>
                    </v-card>

                </v-hover>
            </drag>
        </drop>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {consts} from '@/utils';
    export default {
        name: "StatusTasks",
        props: {
            statusItem: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            taskList: {
                type: Array,
                default: () => {
                    return []
                }
            },
            statusIndex: {
                type: Number,
                default: -1
            },
            dragPosition: {
                type: Number,
                default: -1
            },
        },
        data() {
            return {
                status: this.statusItem,
                tasks: this.taskList,
                indexes: this.statusIndex,
                dragIndex: this.dragPosition
            }
        },
        filters: {
            loadTaskExecutorName(task) {
                if (task.executor && task.executor.data) {
                    return task.executor.data.name
                } else {
                    return '未指派'
                }
            }
        },
        watch: {
            statusItem(val) {
                this.status = val;
            },
            taskList(val) {
                this.tasks = val;
            },
            statusIndex(val) {
                this.indexes = val;
            },
            dragPosition(val){
                this.dragIndex = val
            }
        },
        computed:{
            blockStyle(){
                let bgColor = this.dragIndex !== -1 && this.dragIndex !== this.indexes ?  consts.colorStringToColor(this.status.color,0.3): 'transparent';
                let bdColor = this.dragIndex !== -1 && this.dragIndex !== this.indexes ?  consts.colorStringToColor(this.status.color,0.8): 'transparent';
                return {
                    background: bgColor,
                    border: bdColor+ ' 1px solid',
                }
            },
            ...mapGetters({
                'typeList': 'sprint/getTypeList',
                'prioritiesList': 'sprint/getPrioritiesList',
            }),
        },
        methods:{
        }
    }
</script>

<style scoped lang="less">
    .titleCard {
        position: relative;
        z-index: 3;
    }
</style>

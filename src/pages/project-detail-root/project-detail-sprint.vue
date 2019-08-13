<template>
    <v-container fluid>
        <div :style="fullHeight" style="overflow-y: auto">
            <div style="display: flex ; min-width: 360px ">
                <v-card class="ma-2"
                        min-width="350"
                        v-for="(status, index) in statusList"
                        :key="index+'_'+status.id"
                >
                    <v-card-title>{{status.name}}</v-card-title>
                    <v-divider :color="status.color" style="height: 5px"></v-divider>
                </v-card>
            </div>
            <div style="display: flex; margin-top: 10px ;" :style="blockHeight">
                <drop
                        v-for="(status, index) in statusList"
                        :key="index+'_'+status.id"
                        class="ma-1"
                        style="border-radius: 5px;overflow-x: auto; min-width: 360px"
                        tag="div"
                >
                    <drag
                            v-for="task in getTaskStateList(status.id)"
                            :key="task.id"
                            class="ma-2"
                    >
                        <v-hover v-slot:default="{ hover }"
                            :open-delay="800"
                        >
                            <v-card
                                    min-width="320"
                            >
                                <v-card-title style="font-size: medium">{{task.title}}</v-card-title>
                                <v-expand-transition>
                                    <v-card-text v-if="hover">
                                        <div
                                                v-if="hover"
                                                style="min-height: 88px;"
                                        >
                                            {{task.desc}}
                                        </div>
                                    </v-card-text>
                                    <v-card-text v-else>
                                        <v-layout align-center>
                                            <v-avatar>
                                                <v-img
                                                        v-if="task.executor&& task.executor.data"
                                                        :src="loadAvatarImg(task.executor.data)"
                                                ></v-img>
                                            </v-avatar>
                                            {{task|loadTaskExecutorName}}
                                        </v-layout>
                                        <v-layout>
                                            <v-icon :color="prioritiesList(task.priority).color">
                                                {{typeList(task.type)}}
                                            </v-icon>
                                            <span>{{prioritiesList(task.priority).name}}</span>
                                        </v-layout>
                                    </v-card-text>
                                </v-expand-transition>
                            </v-card>

                        </v-hover>
                    </drag>

                </drop>
            </div>
        </div>
        <v-btn
                absolute
                top
                right
                color="info"
                v-show="sprint.id"
                @click="finishAlert"
        >
            完成冲刺
        </v-btn>
    </v-container>
</template>

<script>
    import api from '@/api';
    import {modal} from '@/utils';
    import {mapGetters,mapActions} from 'vuex';

    export default {
        props: {
            projectId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
            };
        },
        created() {
            this.getProjectActiveSprint(this.projectId);
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
        computed: {
            ...mapGetters({
                'loadAvatarImg': 'avatarUrl',
                'statusList': 'getStatusList',
                'typeList': 'getTypeList',
                'sprint': 'getSprintItem',
                'prioritiesList': 'getPrioritiesList',
            }),
            blockHeight() {
                let height = this.$store.state.contentFullHeight;
                return {
                    height: (height - 88) + 'px'
                }
            },
            fullHeight() {
                return this.$store.getters.fullHeight;
            }
        },
        methods: {
            getTaskStateList(key) {
                return this.sprint.tasks.data.filter(item => {
                    return item.status === key;
                });
            },
            finishAlert() {
                modal.confirm({
                    title: '提示',
                    content: '点击完成按钮后将结束本次冲刺，如果冲刺中有未完成的任务，将被重置为初始状态',
                    ok: {
                        text: '完成',
                    },
                    callback: () => {
                        api.sprint.sprintFinish(this.sprint.id, () => {
                            this.sprint = {}
                        })
                    }
                });
            },
            ...mapActions([
                'getProjectActiveSprint'
            ])
        }
    }
</script>

<style scoped lang="less">
    @import "~@/assets/style/constants.less";
    @import "~@/assets/style/common.less";
</style>

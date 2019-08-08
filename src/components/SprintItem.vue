<template>
    <v-list :value="true" style="background: transparent">
        <v-list-group>
            <template v-slot:activator>
                <v-list-item-title class="smallerFont">
                    {{sprint.name|sprintName}}
                </v-list-item-title>
                <v-list-item-action>
                    <v-btn class="smallerFont" text @click="$emit('startSprint',sprint.id)">
                        开始冲刺
                    </v-btn>
                </v-list-item-action>
            </template>
            <template
                    v-for="(task, tindex) in sprint.tasks.data"
            >
                <v-divider :key="tindex"></v-divider>
                <v-list-item
                        :key="task.id"
                >
                    <v-list-item-content>
                        <v-list-item-title>
                            {{task.title}}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list-group>
        <v-divider></v-divider>
        <v-list-item v-if="!showCreateTask">
            <v-list-item-action>
                <v-btn small icon @click="showCreateTask = true">
                    <v-icon :size="18">
                        add
                    </v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-list-item v-else>
            <v-list-item-content style="max-width: 120px;" class="mr-4">
                <v-select
                          v-model="taskTypeId"
                          :items="taskTypes"
                          item-value="id"
                          item-text="name"
                          :prepend-icon="typeSelectIcon"
                >
                </v-select>
            </v-list-item-content>
            <v-list-item-content>
                <v-text-field
                        v-model="taskTitle"
                    placeholder="请输入任务标题"
                        clearable
                ></v-text-field>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-list-item-action>
                <v-btn text class="smallerFont" @click="showCreateTask = false">
                    取消
                </v-btn>
            </v-list-item-action>
            <v-list-item-action>
                <v-btn icon small class="smallerFont">
                    <v-icon :size="24">more_horiz</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
    </v-list>

</template>

<script>
    export default {
        name: "SprintItem",
        props: {
            sprint: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            taskTypes: {
                type: Array,
                default: () => {
                    return []
                }
            },
            defaultPriorityId: {
                type: String,
                default: ''
            },
            defaultStatusId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                showCreateTask: false,
                taskTypeId: this.taskTypes[0].id,
                taskTitle: ''
            }
        },
        filters: {
            sprintName(name) {
                if (name + '' === '0') {
                    return '未分配'
                } else {
                    return `冲刺-S${name}`
                }
            }
        },
        computed: {
            typeSelectIcon(){
                let type = this.taskTypes.filter(item=>{
                    return item.id === this.taskTypeId
                });
                if(type && type.length > 0){
                    return type[0].icon
                }
                return '';
            }
        }
    }
</script>

<style scoped lang="less">
    .smallerFont {
        font-size: smaller;
    }
</style>
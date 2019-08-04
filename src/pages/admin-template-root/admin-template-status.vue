<template>
    <v-container fluid>
        <v-list style="background: transparent">
            <template v-for="status in statusList">
                <drop @drop="dropItem">
                    <drag>
                        <v-list-item
                                :key="status.id"
                        >
                            <v-list-item-icon>
                                <v-icon>
                                    {{status.type|statusMoveIcon}}
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{status.name}}</v-list-item-title>
                            </v-list-item-content>
                            <v-spacer></v-spacer>
                            <v-list-item-action>
                                <v-btn>
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </v-list-item-action>
                            <v-list-item-action>
                                <v-btn>
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </v-list-item-action>

                        </v-list-item>
                    </drag>
                </drop>
                <v-divider :key="'divider:'+status.id"></v-divider>
            </template>
        </v-list>
        <v-btn
                absolute
                dark
                color="success"
                right
                top
        >
            <v-icon>add</v-icon>
            新状态
        </v-btn>
    </v-container>
</template>

<script>
    import api from '@/api';

    export default {
        name: "admin-template-status",
        props: {
            templateId: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                statusList: []
            }
        },
        created() {
            this.getTemplateStatusList();
        },
        filters:{
            statusMoveIcon(type){
                if(type+'' === '0'){
                    return 'expand_more';
                }else if(type+'' === '1'){
                    return 'unfold_more';
                }else {
                    return 'expand_less';
                }
            }
        },
        methods: {
            dropItem(event){
                console.log('drop item is ', event);
            },
            getTemplateStatusList() {
                api.template.getTemplateStatus(this.templateId, list => {
                    this.formatStatusList(list);
                })
            },
            formatStatusList(statusArray) {
                this.statusList = statusArray.sort((a, b) => {
                    return a.indexes - b.indexes
                });
            }
        }
    }
</script>

<style scoped lang="less">

</style>

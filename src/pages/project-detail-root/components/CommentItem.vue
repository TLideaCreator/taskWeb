<template>
    <div>
        <v-row justify="space-between" align="center">
            <v-col cols="5">
                <v-avatar :size="32">
                    <img :src="(userInfo)|userAvatar"/>
                </v-avatar>
                <span class="ml-2">{{userInfo.name}}</span>
                <span class="timeSpan ml-2">创建于:{{comment.created_at|timeFormat}}</span>
                <span v-show="comment.created_at !== comment.updated_at" class="timeSpan ml-2">更新于:{{comment.updated_at|timeFormat}}</span>
            </v-col>
            <v-col cols="2" style="display:flex; justify-content: flex-end">

                <v-hover v-slot:default="{hover}">
                        <v-icon v-if="!hover">more_vert</v-icon>
                    <div v-else>
                        <v-btn v-show="showAction" text small color="primary" @click="editable = true">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn v-show="showAction" text small color="error" @click="$emit('delComment',comment)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </div>
                </v-hover>
            </v-col>
        </v-row>
        <RichEditor
                v-model="comment.content"
                :height="150"
                :editable="editable"
                :fontSize="12"
                @save="updateComment"
        ></RichEditor>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import RichEditor from "../../../components/RichEditor";
    import api from '@/api';

    export default {
        components: {RichEditor},
        props: {
            commentItem: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        name: "CommentItem",
        data() {
            return {
                editable: false,
                comment: this.commentItem
            }
        },
        watch: {
            commentItem(val) {
                this.comment = val
            }
        },
        computed: {
            userInfo() {
                return this.commentItem.creator && this.commentItem.creator.data ? this.commentItem.creator.data : {}
            },
            ...mapGetters([
                'isUserLogin'
            ]),
            showAction() {
                return this.isUserLogin.id === this.comment.creator_id && !this.editable;
            }
        },
        methods: {
            updateComment() {
                api.taskComment.updateTaskComments(this.comment, item => {
                    this.comment = item;
                    this.editable = false;
                })
            },

        }
    }
</script>

<style scoped lang="less">
    .timeSpan {
        font-size: 12px
    }
</style>

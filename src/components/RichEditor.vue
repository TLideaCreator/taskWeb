<template>
    <mavon-editor
            ref="md"
            v-model="mdContent"
            :style="markDowStyle"
            @fullScreen="fullScreenMark = $event"
            :defaultOpen="defaultOpen"
            :toolbarsFlag="editable"
            :subfield="false"
            :boxShadow="false"
            :shortCut="false"
            :placeholder="placeholder"
            @change="changeContent"
            @save="$emit('save')"
            @imgAdd="addImgListener"
            @imgDel="delImgListener"
            :fontSize="fontSize+'px'"
            :toolbars="markdownOption">
    </mavon-editor>
</template>
<script>
    import api from '@/api';

    export default {
        props: {
            content: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            editable: {
                type: Boolean,
                default: false
            },
            saveActive: {
                type: Boolean,
                default: true
            },
            height: {
                type: Number,
                default: 300
            },
            fontSize: {
                type: Number,
                default: 15
            }
        },
        model: {
            prop: 'content',
            event: 'change'
        },
        data() {
            return {
                fullScreenMark: false,
                mdContent: this.content
            }
        },
        watch: {
            content(val) {
                this.mdContent = val
            }
        },
        computed: {
            defaultOpen() {
                return this.editable ? 'edit' : 'preview'
            },
            markdownOption() {
                return {
                    header: true,
                    bold: true,
                    link: true,
                    imagelink: true,
                    ol: true,
                    code: true,
                    fullscreen: true,
                    preview: true,
                    save: this.saveActive
                }
            },
            markDowStyle() {
                return {
                    minHeight: this.height + 'px',
                    fontSize: this.fontSize + 'px',
                    zIndex: this.fullScreenMark ? 999 : 1
                }
            }
        },
        methods: {
            changeContent(value) {
                this.$emit('change', value)
            },
            addImgListener(pos, $file) {
                this.$emit('addImg', $file, (url) => {
                    if (url) {
                        this.$refs.md.$img2Url(pos, url)
                    }
                })
            },
            delImgListener(pos) {
                api.task.delTaskFile(pos[0], () => {
                });
            }
        }
    }
</script>
<style scoped></style>

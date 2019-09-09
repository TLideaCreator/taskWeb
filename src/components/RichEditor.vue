<template>
        <mavon-editor
                ref="md"
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
                v-model="content" :toolbars="markdownOption">
        </mavon-editor>
</template>
<script>
    export default {
        props: {
            content: {
                type: String,
                default: ''
            },
            placeholder:{
                type:String,
                default: ''
            },
            editable:{
                type: Boolean,
                default: false
            }
        },
        model: {
            prop: 'content',
            event: 'change'
        },
        data() {
            return {
                fullScreenMark: false
            }
        },
        computed: {
            defaultOpen(){
                return this.editable ? 'edit': 'preview'
            },
            markdownOption() {
                return {
                    header: true,
                    bold: true,
                    imagelink: true,
                    ol: true,
                    fullscreen: true,
                    preview: true,
                    save: true
                }
            },
            markDowStyle() {
                return {zIndex: this.fullScreenMark ? 999 : 1}
            }
        },
        methods:{
            changeContent(value){
                this.$emit('change',value)
            },
            addImgListener(pos, $file){
                this.$emit('addImg',$file,(url)=>{
                    if(url){
                       this.$refs.md.$img2Url(pos,url)
                    }
                })
            },
            delImgListener(pos, $file){
                this.$emit('delImg',$file,(url)=>{
                    if(url){
                        this.$refs.md.$img2Url(pos,url)
                    }
                })
            }
        }
    }
</script>
<style scoped></style>

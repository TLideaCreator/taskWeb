<template>
    <v-layout style="height:60px">
        <v-btn v-for="(member,index) in memberList" :key="member.id"
                type="text"
                style="margin-right: 5px"
                :color="member.checked ? colors[index]:''"
                @click="updateMemberChecked(member.id)">{{member|name}}
        </v-btn>
    </v-layout>
</template>

<script>
    import {consts} from '@/utils'
    export default {
        name: "NameFilterLine",
        props: {
            members: {
                type: Array,
                default: () => {
                    return []
                }
            },
            colorArray:{
                type:Array,
                default:()=>{
                    return  [
                        '#f0a955',
                        '#a363f0',
                        '#b0e3f0',
                        '#dcacf0',
                        '#40acf0',
                    ];
                }
            }
        },
        data() {
            return {
                memberList: this.members,
                colors: this.colorArray
            }
        },
        watch: {
            members(val) {
                this.memberList = val;
            },
            colorArray(val){
                this.colors = val
            }
        },
        filters:{
            name(member){
                if(member.id === consts.userInfo.id){
                    return '我的'
                }else{
                    if(member.name){
                        return member.name
                    }else{
                        return '未指派'
                    }
                }

            }
        },
        methods:{
            getBtnStyle(member, index){
                return member.checked ? this.colors[index]:'';
            },
            updateMemberChecked(memberId){
                this.$emit('updateChecked', memberId);
            }
        }
    }
</script>

<style scoped>

</style>

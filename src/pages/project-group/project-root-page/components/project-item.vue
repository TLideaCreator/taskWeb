<template>
    <div class="funDiv" :class="itemCss" >
        <img class="leftIcon" :src="require('../../../../assets/images/project/'+leftIcon+'.png')"/>
        <span class="spanStyle">{{titleTxt}}</span>
        <Icon :class="'right-icon-'+signType" :type="rightIcon" :size="20" ></Icon>
    </div>
</template>

<script>
    export default {
        name: "project-item",
        props:{
            title:{
                type:String,
                default: ''
            },
            inActive: {
                type: Boolean,
                default: false
            },
            iconSrc: {
                type:String,
                default: ''
            },
            path: {
                type:String,
                default: ''
            },
            signType:{
                type: String,
                default: '',
                validate:(val)=>{
                    return ['','more', 'next'].indexOf(val) >= 0;
                }
            }
        },
        data(){
            return {
                leftIcon: this.iconSrc,
                titleTxt: this.title,
                itemCss: this.inActive ? 'funDivSelected' : ''
            }
        },
        computed:{
            rightIcon(){
                switch (this.signType) {
                    case 'more': return 'md-arrow-dropdown';
                    case 'next': return 'md-arrow-dropright';
                    default: return '';
                }
            },
        },
        watch:{
            title(val){
                this.titleTxt = val;
            },
            inActive(val){
                this.itemCss = val ? 'funDivSelected' : '';
            },

            iconSrc(val){
                this.leftIcon = val
            }
        },
        methods:{

        }
    }
</script>

<style scoped lang="less">
    .funDiv{
        height: 44px;
        border-radius: 5px;
        display: flex;
        color:#333333;
        justify-content: space-around;
        align-items: center;
        margin-top: 5px;
        .right-icon-{
            width: 20px;
        }
        .right-icon-next{
            width: 20px;
            color: transparent;
        }
        .right-icon-more{
            width: 20px;
        }
    }

    .leftIcon{
        width: 25px;
        height: 25px;
        margin: 5px 10px 5px 0;
    }

    .funDiv:hover{
        background: #dfe0e2;
        color: #33b5fc;
        .right-icon{
            width: 20px;
        }
        .right-icon-next{
            width: 20px;
            color: #33b5fc;
        }
        .right-icon-more{
            width: 20px;
        }
    }


    .spanStyle{
        min-width: 100px;
        font-size: 14px;
    }

    .funDivSelected{
        background: #dfe0e2;
        color: #33b5fc;
        .right-icon{
            width: 20px;
        }
        .right-icon-next{
            width: 20px;
            color: #33b5fc;
        }
        .right-icon-more{
            width: 20px;
        }
    }
</style>

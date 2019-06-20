<template>
    <div class="funDiv" :class="itemCss" >
        <Icon v-if="iconType==='icon'" class="leftIcon" :size="24" :type="leftIcon"></Icon>
        <img v-else class="leftImg" :src="leftIcon"/>
        <span class="spanStyle">{{titleTxt}}</span>
        <Icon :class="'right-icon-'+signType" :type="rightIcon" :size="20" ></Icon>
    </div>
</template>

<script>
    export default {
        name: "fun-item",
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
            iconType:{
                type:String,
                default: 'icon',
                validate:(val)=>{
                    return ['icon', 'img'].indexOf(val) >= 0;
                }
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
        width: 28px;
    }
    .leftImg{
        width: 25px;
        height: 25px;
    }

    .funDiv:hover{
        background: rgba(255,255,255,0.9);
        color: #33b5fc;
        -webkit-box-shadow: 1px 1px 2px #6d6d6d;
        -moz-box-shadow: 1px 1px  2px #6d6d6d;
        box-shadow: 1px 1px 2px #6d6d6d;
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
        background: rgba(255,255,255,0.9);
        color: #33b5fc;
        -webkit-box-shadow: 1px 1px 2px #6d6d6d;
        -moz-box-shadow: 1px 1px  2px #6d6d6d;
        box-shadow: 1px 1px 2px #6d6d6d;
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

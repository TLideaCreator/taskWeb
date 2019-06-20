import {consts} from '@/utils'

export default {
    fullHeight (){
        return consts.contentHeight;
    },
    formItem(state){
        return state.formItem;
    },
    ruleValidate(){
        return{
            loginName:[
                {required: true, message: '请输入账号', trigger: 'blur'},
            ],
            passwd:[
                {required: true, message: '请输入密码', trigger: 'blur'},
            ]
        }
    }
}

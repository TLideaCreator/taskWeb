import {consts, events} from "../../utils";
import api from '../../api';
export default {
    name: 'login-page',
    data(){
        return {
            showPwd: false,
            acctCheck: false,
            pwdCheck: false,
            loginName: '',
            passwd: '',
            filedRule:{
                required: value => !!value || '必填',
                acctMatch: (v) =>{
                    this.acctCheck =consts.matchPhone(v) || consts.matchEmail(v) ;
                    return this.acctCheck || '请输入正确的手机号或者邮箱'
                },
                pwdMatch: (val) => {
                    this.pwdCheck = val && val.length >=6;
                    return this.pwdCheck || '密码长度最少六位'
                }

            }
        }
    },

    methods: {
        handleSubmit() {
            let data = {
                acct: this.loginName,
                pwd: this.passwd
            };
            api.user.userLogin(data, (userInfo)=>{
                events.$emit('userLogin', userInfo);
                this.loginName = '';
                this.passwd = '';
            });
        }
    }
}

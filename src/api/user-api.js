import {http, toast, consts} from '../utils';


export default {
    userLogin({acct, pwd}, callback) {
        http.postRequest('/api/guest/user/login',
            {
                account: acct,
                pwd: pwd
            }, result => {
                toast.success('登录成功！');
                http.token = result.data.token;
                consts.userInfo = result.data;
                if (callback) {
                    callback(result.data);
                }
            }, () => {
                toast.error('登录失败，请检查账号或密码');
            })
    },

    createUserApi(data, callback) {
        http.postRequest('/api/users', data,
            () => {
                if (callback) {
                    callback();
                }
            }
            , code => {
                let msg = '创建失败，请稍后重试';
                switch (code) {
                    case 404:
                        msg = '参数错误';
                        break;
                    case 425:
                        msg = '手机号已存在';
                        break;
                    case 426:
                        msg = '邮箱已存在';
                        break;
                }
                toast.error(msg);
            })
    },

    queryUserList(params, callback) {
        http.getRequest('/api/users', params, result=>{
            if(callback){
                callback(result);
            }
        }, ()=>{
            toast.error('网络异常，请稍后重试');
        });
    }
}
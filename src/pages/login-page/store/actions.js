import {api, events} from "../../../utils";

export default {
    resetLoginInfo({commit}) {
        commit('formItem', {loginName: '', passwd: ''})
    },
    handleSubmit({state, dispatch}, name) {
        name.validate((valid) => {
            if (valid) {
                let data = {
                    acct: state.formItem.loginName,
                    pwd: state.formItem.passwd
                };
                api.userLogin(data, (userInfo)=>{
                    dispatch('resetLoginInfo');
                    events.$emit('userLogin', userInfo);
                });
            }
        })
    }
}

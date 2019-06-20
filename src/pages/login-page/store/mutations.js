export default {
    formItemLoginName(state,val){
        state.formItem.loginName = val;
    },
    formItemPasswd(state,val){
        state.formItem.passwd = val;
    },
    formItem(state,data){
        state.formItem = data;
    }
}
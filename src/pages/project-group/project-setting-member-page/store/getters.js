export default {
    getTitleList(){
        return  [
            {span:6,name:'姓名'},
            {span:6,name:'手机'},
            {span:6,name:'邮箱'},
            {span:6,name:'角色'}
        ]
    },
    getMemberList(state){
        return state.memberList.filter(item=>{
            if(state.searchKey === ''){
                return true;
            }
            return item.userName.indexOf(state.searchKey)>=0 ||
                item.phone.indexOf(state.searchKey)>=0 ||
                item.email.indexOf(state.searchKey)>=0
        });
    },
    getScrollerHeight(state){
        return state.scrollerHeight;
    },
    getRoleList(state){
        return [
            {
                id: '-1',
                name: '未分配'
            },
            ...state.roleList
        ]
    },

    getRoleIcon:(state)=>(id) => {
        let roles = state.roleList.filter(item=>{
            return item.id === id;
        });
        if(roles.length === 0){
            return '';
        }else {
            return roles[0].icon
        }
    }
}

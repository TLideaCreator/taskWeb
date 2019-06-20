import {consts} from '@/utils'
export default {
    fullHeight (){
        return consts.contentHeight;
    },
    getUserList(state){
        return state.userList;
    },

    getPageCount(state){
        return state.pageCount;
    },
    getUserTotalCount(state){
        return state.totalCount;
    },

    getUserTitleList (){
        return [
            {span:4,name:'姓名'},
            {span:4,name:'电话'},
            {span:6,name:'email'},
            {span:4,name:'管理员'},
            {span:6,name:''},
        ];
    }
}

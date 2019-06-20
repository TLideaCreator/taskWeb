import store from './store/store'
import {mapActions, mapGetters} from 'vuex';
export default {
    name: 'root-page',
    store,
    computed:{
        showSideMenu:{
          set(val){
              store.dispatch('menuTrigger', val)
          },
          get(){
              return store.getters.checkSideMenuState;
          }
        },

        ...mapGetters({
            contentLayout: 'getContentLayoutStyle',
            fullHeight: 'getFUllHeight',
            menuList: 'getMenuList',
            userInfo: 'getUserInfo',
            activePath:'getUserAvatar'
        })
    },
    beforeCreate(){
        store.dispatch('initPageLayoutConst');
    },
    methods: {
        ...mapActions([
            'logoutTaskBoard',
            'menuSelectChanged'
        ])
    }
}

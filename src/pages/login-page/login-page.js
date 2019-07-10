import store from './store/store';
import {mapActions} from "vuex";
export default{
    store,
    name: 'login-page',
    data(){
        return {
            showPwd: false,
            acct: '',
            pwd: '',
        }
    },
    methods:{
        submit(){
          this.loginAction({
              acct:this.acct,
              pwd:this.pwd,
          });
        },
        ...mapActions(['loginAction'])
    }
}

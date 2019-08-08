import Vue from 'vue';
import App from './pages/root-page.vue';
import {http,router} from './utils';
import HeaderLine from "@/components/HeaderLine";
import * as filters from './filters/filters'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont';
import store from './store/store'
import vuetify from './plugins/vuetify';
import VueDragDrop from 'vue-drag-drop';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueDragDrop);
Vue.component('HeaderLine', HeaderLine);

Object.keys(filters).forEach((key)=>{
  Vue.filter(key, filters[key]);
});

http.apiHost = process.env.VUE_APP_API_HOST;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  watch:{
    '$route.name': ()=>{
        store.commit('updateRouterName', router.currentRoute.meta.root);
    }
  }
}).$mount('#app');

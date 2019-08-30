import Vue from 'vue';
import App from './pages/root-page.vue';
import {router} from './utils';
import api from './api'
import HeaderLine from "@/components/HeaderLine";
import * as filters from './filters/filters'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont';
import store from './store/store'
import vuetify from './plugins/vuetify';
import VueDragDrop from 'vue-drag-drop';

Vue.config.productionTip = false;

api.init();

Vue.use(Vuetify);
Vue.use(VueDragDrop);
Vue.component('HeaderLine', HeaderLine);

Vue.config.silent = process.env.NODE_ENV === 'production';

Object.keys(filters).forEach((key)=>{
  Vue.filter(key, filters[key]);
});


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

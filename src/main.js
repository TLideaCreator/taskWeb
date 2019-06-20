import Vue from 'vue';
import App from './pages/root-page/root-page.vue';
import {http,router} from './utils';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import HeaderLine from "@/components/HeaderLine";
import './assets/style/widget-common.less';
import * as filters from './filters/filters'


Vue.config.productionTip = false;

Vue.use(iView);

Vue.component('HeaderLine', HeaderLine);

Object.keys(filters).forEach((key)=>{
  Vue.filter(key, filters[key]);
});

http.apiHost = process.env.VUE_APP_API_HOST;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

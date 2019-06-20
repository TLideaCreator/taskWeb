import router from './router';
import {Message as toast, LoadingBar as loading, Notice as notice ,Modal as modal} from 'iview';

import Vue from 'vue';
import http from './http-client';
import Storage from './storage';
import consts from './constants';
import date from './date';
import api from './api';

let storage = new Storage();
let events = new Vue();
let base64 = require('js-base64').Base64;

consts.init();

router.beforeEach((to, from , next)=>{
    if(to.name === 'login'){
        if(consts.isUserLogin()) {
            next({name: 'project'})
        }else{
            next();
        }
    }else {
        if(consts.isUserLogout()){
            next({name: 'login'})
        }else{
            next();
        }
    }
});

function stringIsEmpty(val){
    return undefined === val || null === val
        || '' === val || '' === val.trim();
}

export {
    storage,
    router,
    toast,
    loading,
    notice,
    modal,
    events,
    base64,
    http,
    consts,
    date,
    api,
    stringIsEmpty
}

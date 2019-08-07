import router from './router';

import Vue from 'vue';
import http from './http-client';
import Storage from './storage';
import consts from './constants';
import date from './date';
import notice from './notice';
import loading from './loading';
import toast from './toast';
import menus from './menus';
import modal from './modal';

let storage = new Storage();
let events = new Vue();
let base64 = require('js-base64').Base64;

consts.init();

router.beforeEach((to, from , next)=>{
    if(to.name === 'userLoginPage'){
        if(consts.isUserLogin()) {
            next({name: 'userProjectPage'})
        }else{
            next();
        }
    }else {
        if(consts.isUserLogout()){
            next({name: 'userLoginPage'})
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
    events,
    base64,
    http,
    consts,
    date,
    notice,
    menus,
    modal,
    stringIsEmpty
}

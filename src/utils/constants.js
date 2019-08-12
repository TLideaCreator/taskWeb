import {consts, http, storage} from "./index";
import {colorToHex} from "vuetify/lib/util/colorUtils";

let height = 0;
let userInfo = {};

let hexToDec={
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'a': 10,
    'b': 11,
    'c': 12,
    'd': 13,
    'e': 14,
    'f': 15,
};

export default {
    init(){
        userInfo = storage.get('userInfo');
    },

    set contentHeight(val) {
        height = val;
    },

    get contentHeight() {
        return {
            height: height + 'px'
        }
    },

    stringIsEmptyWithTrim(str) {
        return str === undefined || str === null || str.trim() === '';
    },

    objectCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    set userInfo(val) {
        userInfo = val;
        if(val){
            storage.save('userInfo', val);
        }else{
            storage.remove('userInfo')
        }
    },

    get userInfo() {
        return userInfo;
    },

    cleanLoginUserInfo() {
        userInfo = {};
        http.token = undefined;
        storage.remove('userInfo');
    },

    isUserLogin() {
        return storage.get('userInfo') !== undefined && !consts.stringIsEmptyWithTrim(storage.get('auth-key'));
    },

    isUserLogout() {
        return storage.get('userInfo') === undefined || consts.stringIsEmptyWithTrim(storage.get('auth-key'))
    },

    scrollerHeight(contentHeight, itemHeight) {
        if (!itemHeight) {
            itemHeight = 44;
        }
        let scHeight = contentHeight - itemHeight;
        let itemCount = Math.floor(scHeight / itemHeight);
        return itemCount * itemHeight + 22;
    },

    matchPhone(phone) {
        let phoneMatch = /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/;
        return phone && phoneMatch.test(phone.toString());
    },

    matchEmail(email) {
        let emailMatch = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a4-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        return email && emailMatch.test(email.toString());
    },

    highLight(key, content) {
        if (!key || key === '') {
            return content;
        } else {
            return content.replace(key, "<span class='highLight'>" + key + "</span>")
        }
    },
    formatAvatarSrc(user){
        if (user && user.data && user.data.avatar ) {
            return require('../assets/images/avatar/' + user.data.avatar + '.png');
        } else {
            return '';
        }
    },
    colorStringToColor(colorString, alpha){
        if(!alpha){
            alpha =1
        }
        let rDec = hexToDec[colorString[1]] * 16 + hexToDec[colorString[2]];
        let gDec = hexToDec[colorString[3]] * 16 + hexToDec[colorString[4]];
        let bDec = hexToDec[colorString[5]] * 16 + hexToDec[colorString[6]];
        return colorToHex(rDec, gDec, bDec, alpha)
    }
}

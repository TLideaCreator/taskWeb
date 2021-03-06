import {consts, storage} from "./index";
import api from '@/api';
import {RGBAtoCSS,HexToRGBA} from "vuetify/lib/util/colorUtils";

let height = 0;
let userInfo = {};

export default {
    init() {
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
        if (val) {
            storage.save('userInfo', val);
        } else {
            storage.remove('userInfo')
        }
    },

    get userInfo() {
        return userInfo;
    },

    cleanLoginUserInfo() {
        userInfo = {};
        api.setToken();
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
    formatAvatarSrc(user) {
        if (user && user.data && user.data.avatar) {
            return require('../assets/images/avatar/' + user.data.avatar + '.png');
        } else {
            return '';
        }
    },
    colorStringToColor(colorString, algha) {
        let color = HexToRGBA(colorString);
        if(algha){
            color.a = algha
        }
        return RGBAtoCSS(color)
    },
    reloadTaskListMembers(taskList, userId) {
        let memberRow = {};
        taskList.forEach((item) => {
            if (item && item.executor && item.executor.data) {
                let memberId = item.executor.data.id;
                if (!memberRow[memberId]) {
                    if (userId === memberId) {
                        memberRow[memberId] =
                            {id: memberId, name: '我的', checked: false};
                    } else {
                        if (consts.stringIsEmptyWithTrim(memberId)) {
                            memberRow[''] =
                                {id: '', name: '未指派', checked: false};
                        } else {
                            memberRow[memberId] =
                                {id: item.executor.data.id, name: item.executor.data.name, checked: false}
                        }
                    }

                }
            } else {
                memberRow[''] =
                    {id: '', name: '未指派', checked: false};
            }

        });
        return memberRow;
    }

}
